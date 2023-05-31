import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Database, DynamicDataSource, FlatNode, DynamicFlatTreeControl } from './ou-tree';
import { AffiliationDbVO } from 'src/app/core/model/model';
import { PropertiesService } from 'src/app/core/services/properties.service';

@Injectable()
 export class OUsDatabase extends Database<any> {

  pure_live = this.props.properties.inge_rest_uri;
  pure_local = 'http://localhost:8080/rest/';

  constructor (
    private http: HttpClient,
    private props: PropertiesService
  ) {
    super();
  }

  getRootLevelItems(): Observable<AffiliationDbVO[]> {
    console.log(this.pure_live)
    return this.http.get<AffiliationDbVO[]>(`${this.pure_live}/ous/toplevel`).pipe(
      map(nodes => nodes)
    );
  }

  getChildren(item: any): Observable<AffiliationDbVO[]> {
    return this.http.get<AffiliationDbVO[]>(`${this.pure_live}/ous/${item.objectId}/children`).pipe(
      map(ous => ous)
    );

  }

  hasChildren(item: any): boolean {
    return item.hasChildren;
  }
}

@Component({
  selector: 'ou-tree',
  templateUrl: './ou-tree.component.html',
  styleUrls: ['./ou-tree.component.scss'],
  providers: [ OUsDatabase ]
})
export class OuTreeComponent {

  treeControl: DynamicFlatTreeControl<any>;
  dataSource: DynamicDataSource<any>;

  constructor(database: OUsDatabase) {
    this.treeControl = new DynamicFlatTreeControl<any>();
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    database.initialData().subscribe(
      nodes => this.dataSource.data = nodes
    )
  }

  hasChildren = (_: number, nodeData: FlatNode<any>) => nodeData.hasChildren;

  info(node: any) {
    if (!node.hasChildren) {
      alert(JSON.stringify(node, null, 4));
    }
  }
}

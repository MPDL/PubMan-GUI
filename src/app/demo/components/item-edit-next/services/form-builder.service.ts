import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractVO, AlternativeTitleVO, ContextDbRO, CreatorType, CreatorVO, EventVO, FundingInfoVO, FundingOrganizationVO, FundingProgramVO, IdentifierVO, InvitationStatus, ItemVersionVO, LegalCaseVO, MdsPublicationGenre, MdsPublicationVO, OrganizationVO, PersonVO, ProjectInfoVO, PublishingInfoVO, ReviewMethod, SourceVO, SubjectVO } from 'src/app/core/model/model';

type Unbox<T> = T extends Array<infer V> ? V : T;

/* This function is will return a ControlType (FromGroup, FormArray or AbstractControl) including the model class
** Making type safe Forms possible
*/
export type ControlType<T> = {
  [K in keyof T]: T[K] extends Array<any>
  ? FormArray<AbstractControl<Unbox<T[K]>>>
  : T[K] extends Record<string, any>
  ? FormGroup<ControlType<T[K]>>
  : AbstractControl<T[K] | null>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ORCID_PATTERN = /^http[s]?:\/\/orcid.org\/(\d{4})-(\d{4})-(\d{4})-(\d{3}[0-9X])$/;

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(
    private fb: FormBuilder,
  ) { }

  // FormGroup for ItemVersionVO
  item_FG(item: ItemVersionVO | null) {
    const item_form = this.fb.group<ControlType<ItemVersionVO>>({
      message: this.fb.control(item?.message ? item.message : ''),
      localTags: this.fb.array(item?.localTags ? item.localTags.map(lt => this.fb.control(lt) as AbstractControl) : []),
      metadata: item?.metadata ? this.metadata_FG(item.metadata) : this.metadata_FG(null),
      files: undefined,
    });
    return item_form;
  }

  // FomrGroup for ContextDbRO
  context_FG(ctx: ContextDbRO | null) {
    const ctx_form = this.fb.group<ControlType<ContextDbRO>>({
      objectId: this.fb.control(ctx?.objectId ? ctx.objectId : ''),
      name: this.fb.control(ctx?.name ? ctx.name : '')
    });
    return ctx_form;
  }

  // FormGroup for AlternativeTitleVO
  alt_title_FG(at: AlternativeTitleVO | null) {
    const atf = this.fb.group<ControlType<AlternativeTitleVO>>({
      type: this.fb.control(at?.type ? at.type : null),
      language: this.fb.control(at?.language ? at.language : ''),
      value: this.fb.control(at?.value ? at.value : ''),
    });
    return atf;
  }

  // Formgroup for CreatorVO
  creator_FG(creator: CreatorVO | null) {
    const creator_form = this.fb.group<ControlType<CreatorVO>>({
      organization: creator?.organization ? this.organization_FG(creator.organization) : this.organization_FG(null),
      person: creator?.person ? this.person_FG(creator.person) : this.person_FG(null),
      role: this.fb.control(creator?.role ? creator.role : null),
      type: this.fb.control(creator?.type ? creator.type : CreatorType.PERSON)
    });
    return creator_form;
  }

  // FormGroup for OrganizationVO
  organization_FG(ou: OrganizationVO | null) {
    const ou_form = this.fb.group<ControlType<OrganizationVO>>({
      name: this.fb.control(ou?.name ? ou.name : '', [Validators.required]),
      identifier: this.fb.control(ou?.identifier ? ou.identifier : '', [Validators.required]),
      identifierPath: this.fb.array(ou?.identifierPath ? ou.identifierPath.map(s => this.fb.control(s) as AbstractControl) : []),
      address: this.fb.control(ou?.address ? ou.address : ''),
    });
    return ou_form;
  }

  // FormGroup for PersonVO
  person_FG(person: PersonVO | null) {
    const person_form = this.fb.group<ControlType<PersonVO>>({
      givenName: this.fb.control(person?.givenName ? person.givenName : ''),
      familyName: this.fb.control(person?.familyName ? person.familyName : ''),
      completeName: this.fb.control(person?.completeName ? person.completeName : ''),
      titles: this.fb.array(person?.titles ? person.titles.map(t => this.fb.control(t) as AbstractControl) : []),
      alternativeNames: this.fb.array(person?.alternativeNames ? person.alternativeNames.map(an => this.fb.control(an) as AbstractControl) : []),
      pseudonyms: this.fb.array(person?.pseudonyms ? person.pseudonyms.map(p => this.fb.control(p) as AbstractControl) : []),
      orcid: this.fb.control(person?.orcid ? person.orcid : ''),
      identifier: person?.identifier ? this.identifier_FG(person.identifier) : this.identifier_FG(null),
      organizations: this.fb.array(person?.organizations ? person.organizations.map(ou => this.organization_FG(ou) as AbstractControl) : [this.organization_FG(null)])
    });
    return person_form;
  }

  // FormGroup for IdentifierVO
  identifier_FG(identifier: IdentifierVO | null) {
    const identifier_form = this.fb.group<ControlType<IdentifierVO>>({
      id: this.fb.control(identifier?.id ? identifier.id : ''),
      type: this.fb.control(identifier?.type ? identifier.type : null)
    });
    return identifier_form;
  }

  // FormGroup for MdsPublicationVO
  metadata_FG(metadata: MdsPublicationVO | null) {
    const metadata_form = this.fb.group<ControlType<MdsPublicationVO>>({
      title: this.fb.control(metadata?.title ? metadata.title : '', [Validators.required]),
      alternativeTitles: this.fb.array(metadata?.alternativeTitles ? metadata.alternativeTitles.map(at => this.alt_title_FG(at) as AbstractControl) : [this.alt_title_FG(null)]),
      creators: this.fb.array(metadata?.creators ? metadata.creators.map(creator => this.creator_FG(creator) as AbstractControl) : [this.creator_FG(null)]),
      dateAccepted: this.fb.control(metadata?.dateAccepted ? metadata.dateAccepted : ''),
      dateCreated: this.fb.control(metadata?.dateCreated ? metadata.dateCreated : ''),
      dateModified: this.fb.control(metadata?.dateModified ? metadata.dateModified : ''),
      datePublishedInPrint: this.fb.control(metadata?.datePublishedInPrint ? metadata.datePublishedInPrint : ''),
      datePublishedOnline: this.fb.control(metadata?.datePublishedOnline ? metadata.datePublishedOnline : ''),
      dateSubmitted: this.fb.control(metadata?.dateSubmitted ? metadata.dateSubmitted : ''),
      degree: this.fb.control(metadata?.degree ? metadata.degree : null),
      event: metadata?.event ? this.event_FG(metadata.event) : this.event_FG(null),
      legalCase: metadata?.legalCase ? this.legal_case_FG(metadata.legalCase) : this.legal_case_FG(null),
      genre: this.fb.control(metadata?.genre ? metadata.genre : MdsPublicationGenre.ARTICLE),
      identifiers: this.fb.array(metadata?.identifiers ? metadata.identifiers.map(id => this.identifier_FG(id) as AbstractControl) : [this.identifier_FG(null)]),
      languages: this.fb.array(metadata?.languages ? metadata.languages.map(l => this.fb.control(l) as AbstractControl) : []),
      location: this.fb.control(metadata?.location ? metadata.location : ''),
      publishingInfo: metadata?.publishingInfo ? this.publishing_info_FG(metadata.publishingInfo) : this.publishing_info_FG(null),
      reviewMethod: this.fb.control(metadata?.reviewMethod ? metadata.reviewMethod : ReviewMethod.NO_REVIEW),
      sources: this.fb.array(metadata?.sources ? metadata.sources.map(s => this.source_FG(s) as AbstractControl) : [this.source_FG(null)]),
      freeKeywords: this.fb.control(metadata?.location ? metadata.location : ''),
      subjects: this.fb.array(metadata?.subjects ? metadata.subjects.map(s => this.subject_FG(s) as AbstractControl) : [this.subject_FG(null)]),
      tableOfContents: this.fb.control(metadata?.tableOfContents ? metadata.tableOfContents : ''),
      totalNumberOfPages: this.fb.control(metadata?.totalNumberOfPages ? metadata.totalNumberOfPages : ''),
      abstracts: this.fb.array(metadata?.abstracts ? metadata.abstracts.map(a => this.abstract_FG(a) as AbstractControl) : [this.abstract_FG(null)]),
      projectInfo: this.fb.array(metadata?.projectInfo ? metadata.projectInfo.map(pi => this.project_info_FG(pi) as AbstractControl) : [this.abstract_FG(null)]),
    });
    return metadata_form;
  }
  // FormGroup for SourceVO
  source_FG(source: SourceVO | null) {
    const source_form = this.fb.group<ControlType<SourceVO>>({
      alternativeTitles: this.fb.array(source?.alternativeTitles ? source.alternativeTitles.map(at => this.alt_title_FG(at) as AbstractControl) : [this.alt_title_FG(null)]),
      title: this.fb.control(source?.title ? source.title : ''),
      creators: this.fb.array(source?.creators ? source.creators.map(c => this.creator_FG(c) as AbstractControl) : [this.creator_FG(null)]),
      volume: this.fb.control(source?.volume ? source.volume : ''),
      issue: this.fb.control(source?.issue ? source.issue : ''),
      datePublishedInPrint: this.fb.control(source?.datePublishedInPrint ? source.datePublishedInPrint : new Date()),
      startPage: this.fb.control(source?.startPage ? source.startPage : ''),
      endPage: this.fb.control(source?.endPage ? source.endPage : ''),
      sequenceNumber: this.fb.control(source?.sequenceNumber ? source.sequenceNumber : ''),
      publishingInfo: source?.publishingInfo ? this.publishing_info_FG(source.publishingInfo) : this.publishing_info_FG(null),
      identifiers: this.fb.array(source?.identifiers ? source.identifiers.map(i => this.identifier_FG(i) as AbstractControl) : [this.identifier_FG(null)]),
      // sources: this.fb.array(source?.sources ? source.sources.map(s => this.source_FG(s) as any) : [this.source_FG(null)]),
      genre: this.fb.control(source?.genre ? source.genre : null),
      totalNumberOfPages: this.fb.control(source?.totalNumberOfPages ? source.totalNumberOfPages : ''),
    });
    return source_form;
  }

  // FormGroup for EventVO
  event_FG(event: EventVO | null) {
    const event_form = this.fb.group<ControlType<EventVO>>({
      endDate: this.fb.control(event?.endDate ? event.endDate : ''),
      invitationStatus: this.fb.control(event?.invitationStatus ? event.invitationStatus : InvitationStatus.INVITED),
      place: this.fb.control(event?.place ? event.place : ''),
      startDate: this.fb.control(event?.startDate ? event.startDate : ''),
      title: this.fb.control(event?.title ? event.title : '')
    });
    return event_form;
  }
  
  // FormGroup for LegalCaseVO
  legal_case_FG(legal_case: LegalCaseVO | null) {
    const case_form = this.fb.group<ControlType<LegalCaseVO>>({
      courtName: this.fb.control(legal_case?.courtName ? legal_case.courtName : ''),
      title: this.fb.control(legal_case?.title ? legal_case.title : ''),
      identifier: this.fb.control(legal_case?.identifier ? legal_case.identifier : ''),
      datePublished: this.fb.control(legal_case?.datePublished ? legal_case.datePublished : '')
    });
    return case_form;
  }

  // FormGroup for PublishingInfoVO
  publishing_info_FG(info: PublishingInfoVO | null) {
    const info_form = this.fb.group<ControlType<PublishingInfoVO>>({
      edition: this.fb.control(info?.edition ? info.edition : ''),
      place: this.fb.control(info?.place ? info.place : ''),
      publisher: this.fb.control(info?.publisher ? info.publisher : '')
    });
    return info_form
  }

  // FormGroup for SubjectVO
  subject_FG(subject: SubjectVO | null) {
    const subject_form = this.fb.group<ControlType<SubjectVO>>({
      language: this.fb.control(subject?.language ? subject.language : ''),
      value: this.fb.control(subject?.language ? subject.language : ''),
      type: this.fb.control(subject?.language ? subject.language : '')
    });
    return subject_form
  }

  // FormGroup for AbstractVO
  abstract_FG(abstract: AbstractVO | null) {
    const abstract_form = this.fb.group<ControlType<AbstractVO>>({
      language: this.fb.control(abstract?.language ? abstract.language : ''),
      value: this.fb.control(abstract?.value ? abstract.value : '')
    });
    return abstract_form
  }

  // FormGroup for ProjectInfoVO
  project_info_FG(pi: ProjectInfoVO | null) {
    const pi_form = this.fb.group<ControlType<ProjectInfoVO>>({
      title: this.fb.control(pi?.title ? pi.title : ''),
      fundingInfo: pi?.fundingInfo ? this.funding_info_FG(pi.fundingInfo) : this.funding_info_FG(null),
      grantIdentifier: pi?.grantIdentifier ? this.identifier_FG(pi.grantIdentifier) : this.identifier_FG(null)
    });
    return pi_form
  }

  // FormGroup for FuningInfoVO
  funding_info_FG(fi: FundingInfoVO | null) {
    const fi_form = this.fb.group<ControlType<FundingInfoVO>>({
      fundingOrganization: fi?.fundingOrganization ? this.funding_org_FG(fi.fundingOrganization) : this.funding_org_FG(null),
      fundingProgram: fi?.fundingProgram ? this.funding_prog_FG(fi.fundingProgram) : this.funding_prog_FG(null)
    });
    return fi_form;
  }

  // FormGroup for FundingOrganizationVO
  funding_org_FG(fo: FundingOrganizationVO | null) {
    const fo_form = this.fb.group<ControlType<FundingOrganizationVO>>({
      title: this.fb.control(fo?.title ? fo.title : ''),
      identifiers: this.fb.array(fo?.identifiers ? fo.identifiers.map(i => this.identifier_FG(i) as AbstractControl) : [this.identifier_FG(null)])
    });
    return fo_form
  }

  // FormGroup for FundingProgramVO
  funding_prog_FG(fp: FundingProgramVO | null) {
    const fp_form = this.fb.group<ControlType<FundingProgramVO>>({
      title: this.fb.control(fp?.title ? fp.title : ''),
      identifiers: this.fb.array(fp?.identifiers ? fp.identifiers.map(i => this.identifier_FG(i) as AbstractControl) : [this.identifier_FG(null)])
    });
    return fp_form
  }
}

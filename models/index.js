// export {BUDGET_MODEL} from './BudgetModel';
// export {COURSE_RESOURCES_MODEL} from './CourseResourcesModel';
// export {COURSE_STRUCTURE_MODEL} from './CourseStructureModel';
// export {DICTIONARY_MODEL} from './DictionaryModel';
// export {INSTRUCTOR_MODEL} from './InstructorModel';
// export {VIDEO_MODEL} from './VideoModel';

module.exports = {
    BUDGET_MODEL: require('./BudgetModel'),
    COURSE_DATES_MODEL: require('./CourseDates'),
    COURSE_RESOURCES_MODEL: require('./CourseResourcesModel'),
    COURSE_STRUCTURE_MODEL: require('./CourseStructureModel'),
    PARTICIPANT_MODEL: require('./ParticipantModel'),
    PRESENTER_COLLECTION_MODEL: require('./PresenterCollectionModel'),
    PRESENTER_MODEL: require('./PresenterModel'),
    REGISTER_MODEL: require('./RegisterModel'),
    TEAM_CHECKIN_MODEL: require('./TeamCheckinModel'),
    VIDEO_MODEL: require('./VideoModel'),
    WORKPLAN_MODEL: require('./WorkplanModel'),
}
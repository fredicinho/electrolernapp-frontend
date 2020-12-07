import {NavigationStates} from "../../../Redux/Actions/navigationActions";

export function getNavigationStateByLocation(location) {
    switch (location) {
        case "/statistics":
            return NavigationStates.STATISTICS;
        case "/":
            return NavigationStates.HOME;
        case "/demo":
            return NavigationStates.DEMO;
        case "/exams":
            return NavigationStates.EXAMS;
        case "/exam":
            return NavigationStates.EXAM;
        case "/exercises":
            return NavigationStates.EXERCISES;
        case "/categories":
            return NavigationStates.CATEGORIES;
        case "/categorySets":
            return NavigationStates.CATEGORYSETS;
        case "/createexam":
            return NavigationStates.CREATE_EXAM;
        case "/createinstitution":
            return NavigationStates.CREATE_INSTITUTION;
        case "/createschoolclass":
            return NavigationStates.CREATE_SCHOOLCLASS;
        case "/createquestion":
            return NavigationStates.CREATE_QUESTION;
        case "/reviseexam":
            return NavigationStates.REVISE_EXAM;
        case "/createusers":
            return NavigationStates.IMPORT_USERS;
        case "/createuser":
            return NavigationStates.CREATE_USER;
        case "/editschoolclass":
            return NavigationStates.EDIT_SCHOOLCLASS;
        case "/export":
            return NavigationStates.EXPORT;
        case "/myprofile":
            return NavigationStates.MY_PROFILE;
        case "/examresults":
            return NavigationStates.EXAM_OVERVIEW;
        default:
            return NavigationStates.NOTFOUND;
    }
}

export function getNavigationName(navigationItem) {
    switch (navigationItem) {
        case NavigationStates.STATISTICS:
            return "Statistiken";
        case NavigationStates.HOME:
            return "Home";
        case NavigationStates.DEMO:
            return "Demo";
        case NavigationStates.EXAM:
            return "Prüfung";
        case NavigationStates.EXAMS:
            return "Prüfungen";
        case NavigationStates.EXERCISES:
            return "Übungen";
        case NavigationStates.CATEGORIES:
            return "Kategorien";
        case NavigationStates.CATEGORYSETS:
            return "Übungssets";
        case NavigationStates.CREATE_SCHOOLCLASS:
            return "Schulklasse erstellen";
        case NavigationStates.EDIT_SCHOOLCLASS:
            return "Schulklasse bearbeiten";
        case NavigationStates.CREATE_INSTITUTION:
            return "Bildungsinstitution erstellen";
        case NavigationStates.CREATE_QUESTION:
            return "Frage erstellen";
        case NavigationStates.CREATE_EXAM:
            return "Prüfung erstellen";
        case NavigationStates.REVISE_EXAM:
            return "Prüfung auswerten";
        case NavigationStates.IMPORT_USERS:
            return "Benutzer importieren";
        case NavigationStates.CREATE_USER:
            return "Benutzer erstellen";
        case NavigationStates.EXPORT:
            return "Daten exportieren";
        case NavigationStates.MY_PROFILE:
            return "Mein Profil";
        case NavigationStates.EXAM_OVERVIEW:
            return "Prüfungsergebnisse";
        default:
            return "Not Found";
    }
}
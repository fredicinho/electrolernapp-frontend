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
        case "/exercices":
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
        default:
            return NavigationStates.NOTFOUND;
    }
}

export function getNavigationName(navigationItem) {
    switch (navigationItem) {
        case NavigationStates.STATISTICS:
            return "Statistiken";
            break
        case NavigationStates.HOME:
            return "Home";
            break
        case NavigationStates.DEMO:
            return "Demo";
            break
        case NavigationStates.EXAMS:
            return "Prüfungen";
            break
        case NavigationStates.EXERCISES:
            return "Übungen";
            break
        case NavigationStates.CATEGORIES:
            return "Kategorien";
            break
        case NavigationStates.CATEGORYSETS:
            return "Übungssets";
            break
        case NavigationStates.CREATE_SCHOOLCLASS:
            return "Schulklasse erstellen";
            break
        case NavigationStates.CREATE_INSTITUTION:
            return "Bildungsinstitution erstellen";
            break
        case NavigationStates.CREATE_QUESTION:
            return "Frage erstellen";
            break
        case NavigationStates.CREATE_EXAM:
            return "Prüfung erstellen";
            break
        case NavigationStates.REVISE_EXAM:
            return "Prüfung auswerten";
        case NavigationStates.IMPORT_USERS:
            return "Benutzer importieren";
        case NavigationStates.CREATE_USER:
            return "Benutzer erstellen";
        default:
            return "Not Found";
    }
}
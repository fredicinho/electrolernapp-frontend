import {NavigationStates} from "../../Redux/Actions/navigationActions";

export function getNavigationStateByLocation(location) {
    switch (location) {
        case "/statistics":
            return NavigationStates.STATISTICS;
            break
        case "/":
            return NavigationStates.HOME;
            break
        case "/demo":
            return NavigationStates.DEMO;
            break
        case "/exams":
            return NavigationStates.EXAMS;
            break
        case "/exercices":
            return NavigationStates.EXERCISES;
            break
        case "/categories":
            return NavigationStates.CATEGORIES
            break
        case "/categorySets":
            return NavigationStates.CATEGORYSETS
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
        default:
            return "Not Found";
    }
}
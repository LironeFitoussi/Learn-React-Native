// Components
import PlacesList from "../components/Places/PlacesList";

// Hooks
import useNav from "../hooks/useNav";

export default function AllPlaces() {
    useNav({icon: "add", destination: "AddPlace"});

    return <PlacesList places={[]} />;
}
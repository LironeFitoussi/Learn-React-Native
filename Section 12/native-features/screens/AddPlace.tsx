// Components
import PlaceForm from "../components/Places/PlaceForm";
import useNav from "../hooks/useNav";

export default function AddPlace() {
    useNav({icon: "save", destination: "AllPlaces"});
    return <PlaceForm />
}
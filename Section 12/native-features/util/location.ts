const GOOGLE_API_KEY = "AIzaSyAMk8wm642yi2GoV6unVkKY-YC8cI-InAs";

function getMapPreview(lat: number, lng: number) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}

export { getMapPreview };
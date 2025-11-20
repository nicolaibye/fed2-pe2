function GoogleMapsSearch() {
  return (
    <div className="w-full h-96 rounded-xs">
      <iframe
        src="https://maps.google.com/maps?q=59.9139,10.7522&z=15&output=embed"
        frameborder="0"
        width="100%"
        height="100%"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default GoogleMapsSearch;

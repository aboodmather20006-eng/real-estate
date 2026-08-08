/* Single source of truth for the placeholder details — swap these for the real
   listing data and every section updates. */

export const PROPERTY = {
  name: "The Aurelia Residences",
  tagline: "Panoramic living, engineered in light.",
  location: "Abdoun Heights, Amman",
  size: "412 m²",
  bedrooms: "4 Bedrooms",
  bathrooms: "5 Bathrooms",
  price: "JOD 1,250,000",
  handover: "Q4 2027",
};

/* TODO: replace with the real number, digits only, country code first. */
export const WHATSAPP_NUMBER = "962790000000";

export const WHATSAPP_MESSAGE = `Hi — I'd like to know more about ${PROPERTY.name}.`;

export const whatsappHref = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Gallery" },
  { id: "amenities", label: "Amenities" },
  { id: "contact", label: "Enquire" },
];

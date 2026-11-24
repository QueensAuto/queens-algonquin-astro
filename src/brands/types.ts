export type BrandConfig = {
    id: string;
    name: string;
    /** Name used in JSON-LD; must match the Google Business Profile title. */
    schemaName?: string;
    domain?: string;
    logoPath: string;
    logoPathWhite?: string;
    primaryColor: string;
    accentColor: string;
    phone: string;
    email: string;
    address: string;
    cityLabel: string;
    googleMapsUrl?: string;
    gaId?: string;
    metaPixelId?: string;
    hours?: {
        monFri: string;
        sat: string;
        sun?: string;
    };
};

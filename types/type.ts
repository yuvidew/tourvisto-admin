export type AuthFromType = {
    username: string;
    email: string;
    password: string;
};

export type SignUpResponse = {
    code: number;
    message: string;
    user: {
        username: string;
        email: string;
        password: string;
    };
};

export type SignInResponse = {
    success: boolean;
    message: string;
    token: string;
    user: {
        email: string;
        name: string;
    };
};

export type PopoverProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
};

export type InputFieldProps = {
    label: string;
    placeholder: string;
    value: string | number;
    onChange: (value: string | number) => void;
};

export type Country = {
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    name: {
        common: string;
        official: string;
        nativeName?: {
            [languageCode: string]: {
                official: string;
                common: string;
            };
        };
    };
    latlng: [number, number];
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
};

export type CountryListType = {
    name: string;
    flag: {
        png: string;
        svg: string;
        alt?: string;
    };
    coordinates: [number, number];
    value: string;
    openStreetMap: string;
};

export type selectWithSearchFieldType = {
    selectValue: string;
    onSelectValue: (value: string) => void;
    label: string;
    placeholder: string;
    frameworks: { value: string; label: string; img?: string }[];
    loading: boolean;
};

export type CommandItemType = {
    label: string;
    shortcut?: string;
    onSelect?: () => void;
};

export type CommandDialogProps = {
    title?: string;
    description?: string;
    items: CommandItemType[];
    placeholder?: string;
    showCloseButton?: boolean;
};

export type SpinnerSizeProps = {
    size?: "default" | "sm" | "lg" | "icon";
    color?: "default" | "primary" | "white";
};

export type formDatatype = {
    country: string;
    duration: number;
    group_type: string;
    travel_style: string;
    interests: string;
    budget_estimate: string;
};

type Activity = {
    time: string;
    description: string;
};

type ItineraryDay = {
    day: number;
    location: string;
    activities: Activity[];
};

type Location = {
    city: string;
    coordinates: [number, number];
    openStreetMap: string;
};

export type Result = {
    name: string;
    description: string;
    estimatedPrice: string;
    duration: number;
    budget: string;
    travelStyle: string;
    country: string;
    interests: string;
    groupType: string;
    bestTimeToVisit: string[];
    weatherInfo: string[];
    location: Location;
    itinerary: ItineraryDay[];
};

export type TravelPlan = {
    id: number;
    userId: number;
    country: string;
    duration: number;
    group_type: string;
    travel_style: string;
    interests: string;
    budget_estimate: string;
    images: string;
    result: string;
    created_at: string;
};

export type TravelDetail = {
    name: string;
    description: string;
    estimatedPrice: string;
    duration: number;
    budget: string;
    travelStyle: string;
    country: string;
    interests: string;
    groupType: string;
    bestTimeToVisit: string[];
    weatherInfo: string[];
    location: {
        city: string;
        coordinates: [number, number]; // Tuple: [latitude, longitude]
        openStreetMap: string;
    };
    itinerary: {
        day: number;
        location: string;
        activities: {
            time: string;
            description: string;
        }[];
    }[];
};

export type TripCardType = {
    id: number;
    result: string;
    imageUrl: string[];
};

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (value: number) => void;
};

export type DropdownProps = {
    children: React.ReactNode;
    id: number;
};

export type StaticCardProps = {
    headerTitle: string;
    total: number;
    currentMonth: number;
    lastMonth: number;
};

export type TrendResult = {
    trend: string;
    percentage: number;
};

export const DETECTION_DISPLAY_GROUPS = [
    {
        id: "detection_group_1",
        name: "Detection Display Group 1",
        tag: "# Detection Display Group 1"
    },
    {
        id: "detection_group_2",
        name: "Detection Display Group 2",
        tag: "# Detection Display Group 2"
    },
    {
        id: "detection_group_3",
        name: "Detection Display Group 3",
        tag: "# Detection Display Group 3"
    },
    {
        id: "detection_group_4",
        name: "Detection Display Group 4",
        tag: "# Detection Display Group 4"
    }
] as const;

export const VIOLATION_TYPES = [
    {
        id: "violation_type_1",
        name: "Violation Type 1",
        tag: "# Violation Type 1"
    },
    {
        id: "violation_type_2",
        name: "Violation Type 2",
        tag: "# Violation Type 2"
    },
    {
        id: "violation_type_3",
        name: "Violation Type 3",
        tag: "# Violation Type 3"
    },
    {
        id: "violation_type_4",
        name: "Violation Type 4",
        tag: "# Violation Type 4"
    }
] as const;

export interface ZoneSettings {
    name: string;
    detectionDisplayGroup: string;
    violationType: string;
}

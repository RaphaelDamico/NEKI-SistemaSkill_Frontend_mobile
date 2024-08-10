export interface InputProps {
    label: string;
    type?: string;
    value: string | undefined;
    onChangeText: (text: string) => void;
    placeholder?: string;
    name?: string;
    id?: string;
    hasIcon?: boolean;
};

export interface CheckboxProps {
    label?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    accessibilityLabelledBy?: string;
    id?: string;
};

export interface ButtonProps {
    content: string | React.ReactNode;
    onPress?: () => void;
    backgroundColor?: string;
    width?: string | number;
    height?: string | number;
};
import React from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface IconProps {
    name: keyof typeof icons;
    style?: object;
    color?: string;
    onPress?: () => void;
}

const icons = {
    eyeClosed: {
        component: Octicons,
        name: "eye-closed"
    },
    viewOpen: {
        component: Octicons,
        name: "eye"
    },
    trash: {
        component: FontAwesome6,
        name: "trash-alt"
    },
    edit: {
        component: FontAwesome6,
        name: "edit"
    }
};

export default function Icon({ name, style, color, onPress }: IconProps) {
    const iconData = icons[name];

    if (!iconData) return null;

    const IconComponent = iconData.component;

    return (
        <IconComponent
            name={iconData.name}
            style={style}
            color={color}
            onPress={onPress}
        />
    );
}

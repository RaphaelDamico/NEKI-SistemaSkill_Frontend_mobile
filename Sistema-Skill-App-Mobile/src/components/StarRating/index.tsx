import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Button from "../Button";

interface StarRatingProps {
    rating: number;
    onRatingChange: (newRating: number) => void;
    isEditing: boolean;
    onSave: () => void;
}

export default function StarRating({ rating, onRatingChange, isEditing, onSave }: StarRatingProps) {
    const [tempRating, setTempRating] = useState(rating);

    const handlePress = (index: number) => {
        if (isEditing) {
            setTempRating(index);
            onRatingChange(index);
        }
    };

    return (
        <View style={styles.starRatingContainer}>
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
                <Text
                    key={star}
                    style={[
                        styles.star,
                        { color: star <= tempRating ? "#FFD700"  : "#CCC" }
                    ]}
                    onPress={() => handlePress(star)}
                >
                    ★
                </Text>
            ))}
            {isEditing && (
                <Button
                    content={"Salvar"}
                    onPress={onSave}
                    style={{backgroundColor: "#1A374B", width: 80}}
                    width={70}
                />
            )}
        </View>
    );
}

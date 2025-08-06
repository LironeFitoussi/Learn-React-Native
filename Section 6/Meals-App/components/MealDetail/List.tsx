import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

interface IListProps {
    data: string[];
    numbered?: boolean;
}

function List({ data, numbered = false }: IListProps) {
    return (
        <>
            {data.map((item, index) => (
                <View key={item} style={styles.listItem}>
                    <Text style={styles.itemText}>
                        {numbered ? `${index + 1}. ${item}` : item}
                    </Text>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: Colors.primary600,
    },
    itemText: {
        color: "white",
        textAlign: "center",
    },
});

export default List;

// Core
import { FlatList, Text, View } from "react-native";
import React, { FC, useEffect, useRef } from "react";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import Frame from "./Frame";

// Utils
import { createNumberPickerArrays } from "../utils/utils";
import { createThemedStyle } from "../utils/styles";

export type TNumberScrtollPickerProps = {
  onScroll: Function;
  onStop: Function;
  onChange: Function;
  defaultValue: number;
  maxNumber: number;
  minNumber?: number;
  keyExtractorLabel: string;
  label: string;
  name: string;
};

const RenderItem = React.memo(
  ({ item }: { item: number | null; index: number }) => {
    const scheme = useColorTheme();
    const styles = computedStyles[scheme];

    return (
      <View style={styles.field}>
        <Text style={styles.label}>
          {item === null ? "" : item.toString().padStart(2, "0")}
        </Text>
      </View>
    );
  }
);
const NumberScrollPicker: FC<TNumberScrtollPickerProps> = ({
  onScroll,
  onStop,
  onChange,
  defaultValue = 0,
  maxNumber,
  minNumber,
  keyExtractorLabel,
  label,
  name,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const numbers = createNumberPickerArrays(maxNumber, minNumber);

  const flatListRef = useRef<FlatList>(null);

  const itemHeight = 30;

  const scrollToItem = (index: number) => {
    flatListRef?.current?.scrollToIndex?.({
      index: Math.max(index - 1, 0),
      animated: false,
      viewPosition: 0,
    });
  };

  const handleSelect = (index: number) => {
    onChange(name, numbers[index || 0]);
  };

  useEffect(() => {
    const index = numbers.indexOf(defaultValue);
    if (index !== -1) scrollToItem(index);
  }, [defaultValue]);

  return (
    <Frame label={label} style={styles.container}>
      <View>
        <View style={styles.pill} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatList}
          ref={flatListRef}
          data={numbers}
          keyExtractor={(item, index) =>
            `${keyExtractorLabel}_${item}_${index}`
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ ...rest }) => <RenderItem {...rest} />}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onTouchStart={() => onScroll()}
          onTouchEnd={() => onStop()}
          onScrollEndDrag={() => {
            onStop();
          }}
          onMomentumScrollEnd={(event) => {
            const { y } = event.nativeEvent.contentOffset;
            const index = Math.floor((y + itemHeight / 2) / itemHeight) + 1;
            handleSelect(index);
          }}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
        />
      </View>
    </Frame>
  );
};

export default NumberScrollPicker;

const computedStyles = createThemedStyle({
  container: {
    flex: 1,
  },
  listContainer: {
    alignItems: "center",
    height: 90,
    justifyContent: "center",
    maxHeight: 90,
    width: "100%",
  },
  flatList: {
    width: "100%",
  },
  field: {
    alignItems: "center",
    flex: 1,
    height: 30,
    justifyContent: "center",
    maxHeight: 30,
    minHeight: 30,
    width: "100%",
  },
  label: {
    color: "primaryText",
    fontSize: 20,
    textAlign: "center",
  },
  pill: {
    borderColor: "primaryText",
    borderLeftWidth: 1,
    borderRadius: 15,
    borderRightWidth: 1,
    borderWidth: 1,
    height: 30,
    position: "absolute",
    top: 30,
    width: "100%",
  },
});

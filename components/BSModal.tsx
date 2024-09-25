// Core
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { forwardRef, PropsWithChildren, useCallback } from "react";
import { View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

type TBottomSheetModalProps = PropsWithChildren;

const BSModal = forwardRef<BottomSheetModal, TBottomSheetModalProps>(
  ({ children }, ref) => {
    const scheme = useColorTheme();
    const styles = computedStyles[scheme];
    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        backgroundStyle={styles.backGround}
        handleIndicatorStyle={styles.handle}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <View style={styles.container}>{children}</View>
      </BottomSheetModal>
    );
  }
);

export default BSModal;

const computedStyles = createThemedStyle({
  backGround: {
    backgroundColor: "primary500",
  },
  handle: {
    backgroundColor: "primary200",
  },
  container: {
    justifyContent: "center",
    padding: 16,
    flex: 1,
  },
});

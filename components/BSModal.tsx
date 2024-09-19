// Core
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { forwardRef, PropsWithChildren, useCallback } from "react";
import { StyleSheet, View } from "react-native";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

type TBottomSheetModalProps = PropsWithChildren;

const BSModal = forwardRef<BottomSheetModal, TBottomSheetModalProps>(
  ({ children }, ref) => {
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

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: GLOBAL_STYLES.colors.primary500,
  },
  handle: {
    backgroundColor: GLOBAL_STYLES.colors.primary200,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    flex: 1,
  },
});

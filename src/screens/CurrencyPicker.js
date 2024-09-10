import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import { Styles } from "../styles";
import dataCurrency from "../constants/CommonCurrency.json";
import { DialogCurrency } from "../components";
import { CurrencyFlag } from "../components/CurrencyFlag";

export const CurrencyPicker = (props) => {
  // Default currency data
  const currencies = Object.values(dataCurrency);

  // State variables
  const [currencyName, setCurrencyName] = useState("Ghanaian Cedi");
  const [code, setCode] = useState("GHS");
  const [symbol, setSymbol] = useState("$");
  const [symbolNative, setSymbolNative] = useState("₵");
  const [visible, setVisible] = useState(false);

  // Destructure props
  const {
    onSelectCurrency,
    currencyCode,
    showFlag = true,
    showCurrencyName = true,
    showSymbol = false,
    showNativeSymbol = true,
    darkMode = true,
    renderChildren,
    showCurrencyCode = true,

    currencyPickerRef,
    enable = true,
    onOpen,
    onClose,

    containerStyle = {},
    modalStyle = {},
    modalAnimation = "slide",
    renderChildrenStyle = {},

    title,
    searchPlaceholder,
    textEmpty,
    showCloseButton = true,
    showModalTitle = true,

    // Accept dynamic data
    data: userData, // New prop for dynamic data
  } = props;

  const {
    container,
    flagWidth = 25,
    currencyCodeStyle,
    currencyNameStyle,
    symbolStyle,
    symbolNativeStyle,
  } = containerStyle;

  useEffect(() => {
    let currency = undefined;
    currencyPickerRef && currencyPickerRef(currencyRef);

    if (currencyCode) {
      currency = currencies.filter((item) => item.code === currencyCode)[0];
    }

    if (currency) {
      const { code, symbol, symbol_native, name } = currency;
      setCurrencyName(name);
      setCode(code);
      setSymbol(symbol);
      setSymbolNative(symbol_native);
    }
  }, [currencyCode, currencies, currencyPickerRef]);

  const currencyRef = {
    open: () => {
      setVisible(true);
      onOpen && onOpen();
    },
    close: () => {
      setVisible(false);
      onClose && onClose();
    },
  };

  const onSelect = (data) => {
    const { code, symbol, symbol_native, name } = data;
    onSelectCurrency && onSelectCurrency(data);
    setCurrencyName(name);
    setCode(code);
    setSymbol(symbol);
    setSymbolNative(symbol_native);
  };

  return (
    <View>
      {enable ? (
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            onOpen && onOpen();
          }}
          style={[Styles.justifyContent, container]}
        >
          {renderChildren ? (
            renderChildren
          ) : (
            <View style={[styles.renderChildrenWrapper, renderChildrenStyle]}>
              {showFlag && <CurrencyFlag currency={code} width={flagWidth} />}
              {showCurrencyCode && (
                <Text style={[styles.txtCurrencyCode, currencyCodeStyle]}>
                  {code}
                </Text>
              )}
              {showCurrencyName && (
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[styles.txtCountryName, currencyNameStyle]}
                >
                  {currencyName.length > 15
                    ? currencyName.slice(0, 19)
                    : currencyName}
                </Text>
              )}
              {showSymbol && (
                <Text style={[styles.txtCountryName, symbolStyle]}>
                  {symbol}
                </Text>
              )}
              {showNativeSymbol && (
                <Text style={[styles.txtCountryName, symbolNativeStyle]}>
                  {symbolNative}
                </Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      ) : null}
      <Modal animationType={modalAnimation} visible={visible}>
        <DialogCurrency
          onSelectItem={(data) => {
            onSelect(data);
          }}
          setVisible={(value) => {
            setVisible(value);
            onClose && onClose();
          }}
          title={title}
          searchPlaceholder={searchPlaceholder}
          textEmpty={textEmpty}
          darkMode={darkMode}
          modalStyle={modalStyle}
          showCloseButton={showCloseButton}
          showModalTitle={showModalTitle}
          showCurrencySymbol={showSymbol}
          showCurrencyNativeSymbol={showNativeSymbol}
          // Pass dynamic data to DialogCurrency
          data={userData} // New prop for dynamic data
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  txtCountryName: {
    ...Styles.fontDefault,
    marginHorizontal: 10,
  },
  txtCurrencyCode: {
    ...Styles.fontDefault,
    marginLeft: 10,
    fontWeight: "600",
  },
  renderChildrenWrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});

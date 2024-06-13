import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import { Styles } from "../styles";
import dataCurrency from "../constants/CommonCurrency.json";
import { DialogCurrency } from "../components";
import { CurrencyFlag } from "../components/CurrencyFlag";

export const CurrencyPicker = (props) => {
	const currencies = Object.values(dataCurrency);

	const [currencyName, setCurrencyName] = useState("US Dollar");
	const [code, setCode] = useState("USD");
	const [symbol, setSymbol] = useState("$");
	const [symbolNative, setSymbolNative] = useState("$");
	const [visible, setVisible] = useState(false);

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
		renderChildrenStyle = {},

		title,
		searchPlaceholder,
		textEmpty,
		showCloseButton = true,
		showModalTitle = true,
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
	}, [props]);

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
			<Modal visible={visible}>
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

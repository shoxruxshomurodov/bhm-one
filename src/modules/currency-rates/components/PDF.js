import React from 'react';
import {Document, Page, StyleSheet} from "@react-pdf/renderer";
import {get} from "lodash";
import PDFHeader from "./PDFHeader";
import PDFTitle from "./PDFTitle";
import PDFTable from "./PDFTable";
import PDFFooter from "./PDFFooter";

const styles = StyleSheet.create({
    page: {
        flex:1,
        flexDirection: 'column',
        padding:'20 15 15 30',
    },
});

const PDF = ({currency={},canvas}) => {
    return (
        <Document>
            <Page size="A4"  style={styles.page}>
                <PDFHeader order_number={get(currency,'order_number','')} created_at={get(currency,'created_at','')} order_date={get(currency,'order_date','')} />
                <PDFTitle />
                <PDFTable title={'VALYUTA AYRIBOSHLASH SHOXOBCHALARI ORQALI'} items={get(currency,'exchangePoints',[])} />
                <PDFTable title={'"XALQ MOBILE" ILOVASI ORQALI'} items={get(currency,'onlineConversions',[])} />
                <PDFTable title={'AVTOMATLASHTIRILGAN VASHLAR (BANKOMATLAR) ORQALI'} items={get(currency,'atmRates',[])} />
                <PDFFooter status={get(currency,'status')} qrcode={canvas} employee={get(currency,'employee',false)} />
            </Page>
        </Document>
    );
};

export default PDF;


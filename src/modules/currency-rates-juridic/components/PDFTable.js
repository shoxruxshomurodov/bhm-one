import React from 'react';
import {StyleSheet, Text, Image, View, Font} from '@react-pdf/renderer';
import {get} from "lodash";
import NumberFormat from "react-number-format";
Font.register({
    family: "Roboto-B",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
});
Font.register({
    family: "Roboto-M",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    table: {
        backgroundColor: '#14E0AC'
    },
    title: {
        fontSize: 13,
        marginBottom: 5,
        fontFamily:"Roboto-M"
    },

    tableHeader: {
        flexDirection: 'row'
    },
    tableHeaderData:{
        fontSize: 11,
        textAlign: 'center',
        padding: 5,
        color:'#fff',
        width:'25%',
        fontFamily: "Roboto-M"
    },
    tableHeaderDataFirst:{
        fontSize: 11,
        textAlign: 'center',
        padding: 5,
        color:'#fff',
        width:'50%',
        fontFamily: "Roboto-M"
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableRowData:{
        borderTop:'1px solid #fff',
        padding:5,
        textAlign:'center',
        backgroundColor: '#F5F5F6',
        fontSize:11,
        width:'25%',
        fontFamily: "Roboto-M"
    },
    tableRowDataFirst:{
        borderTop:'1px solid #fff',
        padding:5,
        fontSize:11,
        width:'50%',
        color:'#fff',
        flexDirection:'row',
        alignItems:'center',
        fontFamily: "Roboto-M"
    },
    text:{
        marginLeft:5
    },
    img:{
        width:15,
        height:15
    }
});

const PDFTable = ({title = 'TEST',items=[]}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderDataFirst}>VALYUTA NOMI</Text>
                    <Text style={styles.tableHeaderData}>SOTISH {"\n"} UZS
                        UZS</Text>
                    <Text style={styles.tableHeaderData}>SOTIB OLISH</Text>
                </View>
                {items && items.map(({id,option,buy,sale}) =><View key={id} style={styles.tableRow}>
                    <View style={styles.tableRowDataFirst}><Image style={styles.img} src={get(option,'img_src')} /><Text style={styles.text}>{get(option,'name','')}</Text></View>
                    <Text style={styles.tableRowData}><NumberFormat displayType={'text'} thousandSeparator={' '} value={sale}/></Text>
                    <Text style={styles.tableRowData}><NumberFormat displayType={'text'} thousandSeparator={' '} value={buy}/></Text>
                </View>)

                }
            </View>
        </View>
    );
};

export default PDFTable;

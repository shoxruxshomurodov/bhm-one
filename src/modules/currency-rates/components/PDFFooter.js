import React from 'react';
import {Image, StyleSheet,Font, Text, View} from '@react-pdf/renderer';
import {get,isEqual} from "lodash";
import qrcodeImg from "../../../assets/images/qrcode.png";
import QRCode from "qrcode.react";


Font.register({
    family: "Roboto-R",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf"
});
Font.register({
    family: "Roboto-I",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf"
});
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row'
    },
    left: {
        width: '80%',
        paddingRight:30
    },
    right: {
        width: '20%',
        textAlign: 'right',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    img: {
        width: 80,
        height: 80,
    },
    italic: {
        fontSize: 12,
        fontFamily: "Roboto-I"
    },
    red:{
        fontSize: 14,
        color:'#FC8C8C'
    },
    sign:{
        marginTop: 15,
        flexDirection:'row',
        alignItems:'flex-start',
        fontFamily: "Roboto-R",
    },
    signText:{
        marginLeft:5,
        fontSize:12,
        fontFamily: "Roboto-R",
        width:'80%'
    }
});

const PDFFooter = ({status,qrcode=null,employee=false}) => {

    return (
        <View style={styles.container}>
            <View style={styles.left}><Text style={styles.italic}>Bank Boshqaruvining 2021 yil 30.09 sanadagi 7-sonli
                qaroriga asosan
                Valyuta kurslari passporti ishlab chiqilgan</Text>
                {employee && <View style={styles.sign}>
                    <Text style={styles.red}>Подписано:</Text><Text style={styles.signText}>{`${get(employee,'post_name','')} ${get(employee,'full_name','')}`}</Text>
                </View>}
            </View>
            <View style={styles.right}>{isEqual(status,1) && <Image src={{uri:qrcode}} style={styles.img}/>}</View>

        </View>
    );
};

export default PDFFooter;

import React from 'react';
import {Text, View, Image, StyleSheet, Font} from '@react-pdf/renderer';
import moment from "moment";
import logo from "../../../assets/images/logo_xb.png";
import Utils from "../../../services/helpers/Utils";
Font.register({
    family: "Roboto-B",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
});

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    logo:{
        width: 150,
    },
    left:{
        width: '50%'
    },
    leftText:{
      fontSize: 12,
        fontWeight:900,
        lineHeight:1.45,
        marginTop:5,
        paddingLeft:10,
        fontFamily:"Roboto-B"
    },
    right:{
        width:'50%',
        flex: 1,
        flexDirection:'row',
        justifyContent:'flex-end',
        fontFamily:"Roboto-B"
    },
    rightText:{
        fontSize:12,
        textAlign:'center',
        lineHeight:1.45
    }
});
const PDFHeader = ({order_number='',created_at='',order_date=''}) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image
                    src={logo}
                    style={styles.logo}
                />
                <Text style={styles.leftText}>{moment(created_at).format("DD/MM/YYYY HH:MM")}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.rightText}>AT XALQ BANKI {"\n"}
                    20{order_date.slice(2,4)} YIL {`${Utils.removeDayStart(order_date.slice(8,10))} - ${Utils.getMonthName(order_date.slice(5, 7))}`}DAGI {"\n"} {order_number}-SONLI {"\n"} XIZMAT FARMOYISHIGA {"\n"} ILOVA</Text>
            </View>
        </View>
    );
};

export default PDFHeader;

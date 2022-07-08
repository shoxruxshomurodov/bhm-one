import React from 'react';
import { Text, View, Font,  StyleSheet } from '@react-pdf/renderer';
Font.register({
    family: "Roboto-B",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
});
Font.register({
    family: "Roboto-R",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf"
});

const styles = StyleSheet.create({
    container: {
        marginTop:20,
    },
    title:{
        fontSize:18,
        marginBottom:10,
        textAlign: 'center',
        fontFamily:"Roboto-B",
    },
    text:{
        fontSize: 12,
        textAlign: 'center',
        fontFamily: "Roboto-R",
    }
});

const PDFTitle = () => {
    return (
        <View style={styles.container}>
                <Text style={styles.title}>VALYUTA KURSLARI  PASPORTI</Text>
                <Text style={styles.text}>(Jismoniy shaxslarning chet el valyutasini sotib olish va sotish
                    kurslari to'g'risida)</Text>
        </View>
    );
};

export default PDFTitle;

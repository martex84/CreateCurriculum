import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

function MyDocument(){
    return(
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                  <Text>Section #2</Text>
                </View>
              </Page>
            </Document>
          );
  }

function PagePdf(){    
    return(
    <PDFViewer>
        {MyDocument()}
    </PDFViewer>
    )
}


export default PagePdf
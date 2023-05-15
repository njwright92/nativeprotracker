import { StyleSheet, View, Text } from "react-native";
import { Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

const AboutScreen = () => {

    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['njwright92@gmail.com'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.aboutSection}>
                <Text style={styles.heading}>About & Info</Text>
                <Text style={styles.aboutText}>Discover the power of our production tracking system, designed to simplify your management tasks. With our dynamic list, you can seamlessly add entries for date and quantity for each product individually. Furthermore, view your production trends over time with our weekly, monthly, and yearly line charts. The beauty of this app? It's designed to replace spreadsheets for businesses, making tracking easier not just for large corporations, but also for individual artists. Mastering this app will streamline your processes and make your tracking tasks a breeze.</Text>
            </View>
            <View style={styles.contactSection}>
                <Text style={styles.heading}>Support/Contact
                </Text>
                <Text style={styles.contactText}>If you have any issues with the site, or if you have any questions or suggestions, feel free to send an email with the details, clickable link below.
                </Text>
                <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
                    <Button
                        title='Send Email'
                        buttonStyle={{
                            backgroundColor: 'rgba(0, 0, 255, 0.5)',
                            margin: 10,
                            borderWidth: 0.5,
                            borderColor: 'black'
                        }}
                        icon={
                            <Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 7 }}
                            />
                        }
                        onPress={() => sendMail()}
                    />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#778899',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    heading: {
        fontSize: 29,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    aboutSection: {
        backgroundColor: '#D3D3D3',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 30,
        padding: 10
    },
    aboutText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contactSection: {
        borderTopWidth: 1,
        borderTopColor: 'black',
        paddingTop: 30,
        backgroundColor: '#F5DEB3',
        borderColor: 'black',
        borderWidth: 2,
    },
    contactText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default AboutScreen

import { StyleSheet, View, Text, Pressable } from "react-native";
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
                    <Pressable
                      style={styles.button}
                        icon={
                            <Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='black'
                                iconStyle={{ marginRight: 7 }}
                            />
                        }
                        onPress={() => sendMail()}
                    >
                    <Text style={styles.buttonText}>Send Email</Text>

                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5BA95',
        paddingVertical: 30,
        borderRadius: 10
    },
    heading: {
        fontSize: 29,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    aboutSection: {
        backgroundColor: '#F9FCF3',
        borderColor: '#D79578',
        borderWidth: 2,
        marginBottom: 30,
        padding: 10,
        borderRadius: 10
    },
    aboutText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contactSection: {
        padding: 10,
        backgroundColor: '#F9FCF3',
        borderColor: '#D79578',
        borderWidth: 2,
        borderRadius: 10
    },
    contactText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(106, 163, 137)',
        alignSelf: 'center',
        width: '30%',
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});

export default AboutScreen

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
                <Text style={styles.heading}>About</Text>
                <Text style={styles.aboutText}>Our production tracking system allows you to easily add, update, and delete items from your products list. You can view the production progress over time on weekly and monthly charts.</Text>
            </View>
            <View style={styles.contactSection}>
                <Text style={styles.heading}>Support/Contact Me
                </Text>
                <Text style={styles.contactText}>If you have any issues with the site, or if you have any questions or suggestions, feel free to contact me via email
                </Text>
                <Button
                    title='Send Email'
                    buttonStyle={{ backgroundColor: 'olive', margin: 10 }}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    aboutSection: {
        marginBottom: 30,
    },
    aboutText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#505050',
    },
    contactSection: {
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
        paddingTop: 30,
    },
    contactText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#505050',
    },
});

export default AboutScreen;

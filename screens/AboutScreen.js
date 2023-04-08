import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

const AboutScreen = () => {
    const navigation = useNavigation();

    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['njwright92@gmail.com'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        });
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={({ pressed }) => [{ backgroundColor: pressed ? '#fff' : 'transparent', borderRadius: 20, padding: 16, width: '85%', marginTop: 10, alignSelf: 'flex-start' }]}
                onPress={() => navigation.goBack()}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chevron-back" size={24} color='#fff' />
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                        Back
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.aboutSection}>
                <Text style={styles.heading}>About</Text>
                <Text style={styles.aboutText}>Our production tracking system allows you to easily add, update, and delete items from your products list. You can view the production progress over time on weekly and monthly charts.</Text>
            </View>
            <View style={styles.contactSection}>
                <Text style={styles.heading}>Support/Contact Me
                </Text>
                <Text style={styles.contactText}>If you have any issues with the site, or if you have any questions or suggestions, feel free to contact me via email
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
        backgroundColor: '#F5DEB3',
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

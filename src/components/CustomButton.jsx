import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomButton = ({ type, step, onPress, disabled }) => {
  const buttonIconNames = {
    previous: 'chevron-back',
    next: 'chevron-forward',
    submit: 'checkmark',
  };

  const buttonText = {
    previous: 'Previous',
    next: step < 2 ? 'Next' : 'Submit',
    submit: 'Submit',
  };

  const isLeftButton = type === 'previous';
  const isRightButton = type === 'next' || type === 'submit';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.stepperButton,
        {
          backgroundColor: type === 'submit' ? '#2dd4bf' : '#00695c',
          justifyContent: isLeftButton ? 'flex-start' : 'flex-end',
        },
        step === 0 &&
          isLeftButton && {
            display: 'none',
          },
      ]}
    >
      {isLeftButton && <Text style={styles.buttonText}>{buttonText[type]}</Text>}
      <Ionicons name={buttonIconNames[type]} size={22} color="#ffffff" />
      {isRightButton && <Text style={styles.buttonText}>{buttonText[type]}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  stepperButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
});

export default CustomButton;

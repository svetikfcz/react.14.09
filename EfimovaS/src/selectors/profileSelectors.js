export const getFullName = state => {
    const { firstName, lastName } = state.profile;
    return `${firstName} ${lastName}`;
};

export const getAvatar = state => state.profile.avatar;
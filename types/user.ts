export interface UserPhone {
  countryCode: string;
  phoneNumber: string;
  _id?: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  username: string;
  lastname: string;
  phone: UserPhone;
  country: string;
  city: string;
  photoUrl?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

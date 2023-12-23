import { INewUser } from '@/types/index'
import { ID, account, appwriteConfig, avatars, databases } from './config'
import { Query } from 'appwrite'

/** REGISTRAR*/
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    if (!newAccount) throw Error
    console.log("new acoount...?",newAccount)
    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    })
    console.log("created user...",newUser)
    return newUser
  } catch (error) {
    console.log(error)
    return error
  }
}

/** GUARDAR EN LA BD EL USER */
export async function saveUserToDB(user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) {
  try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user
		)
    console.log(" saving user...",newUser)
		return newUser
  } catch (error) {
    console.log(error)
  }
}

/** LOGEARSE */
export async function signInAccount(user: { 
	email: string 
	password: string
}) {
	try {
		const session = await account.createEmailSession(user.email, user.password)
		return session
	} catch (error) {
		console.log(error)
	}
}

/** SOLICITER USUARIO */
export async function getCurrentUser() {
	try {
		const currentAccount = await account.get()

		if(!currentAccount) throw Error

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		)

		if(!currentUser) throw Error

		return currentUser.documents[0]

	} catch (error) {
		console.error(error)
	}
}
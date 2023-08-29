import jsonfile from 'jsonfile' // https://www.npmjs.com/package/jsonfile ,to deal with json files
import simpleGit from 'simple-git' // https://www.npmjs.com/package/simple-git ,to deal with git commands

const git = simpleGit() // Create an instance of simpleGit
const jsonFilePath = './data.json' // The json file to commit
const startDate = new Date('2023-08-14') // Change this to your desired start date
const endDate = new Date('2023-08-27') // Change this to your desired end date
const commitsPerDay = 2 // Change this to your desired number of commits per day I set it to 20
const timeBetweenCommits = 1 * 60 * 60 * 1000 // Change this to your desired time interval between commits per day. I set it to 1 hour in milliseconds
const oneDay = 24 * 60 * 60 * 1000 // This is the number of milliseconds in a day, think about it as a step between startDate and endDate

/**
 * Formats a given date object into a string representation of the date and time.
 *
 * @param {Date} date - The date object to be formatted.
 * @return {string} A string representation of the date and time in the format "YYYY-MM-DD HH:MM".
 */
const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * Generates commits and pushes them to the repository within a specified date range.
 *
 * @return {Promise<void>} This function does not return a value.
 */
const makeCommitsAndPush = async () => {
  try {
    console.log('Making commits starting...')
    // Create currentDate to keep track of the date and time
    let currentDate = startDate

    // Loop through each day
    while (currentDate <= endDate) {
      // Loop through each commit per day
      for (let i = 0; i < commitsPerDay; i++) {
        // Create json data object
        const data = {
          date: currentDate.valueOf(),
        }

        console.log('Committing on:', formatDateTime(currentDate))
        // Write data to json file
        await jsonfile.writeFile(jsonFilePath, data)
        // Add the json file to staging area
        await git.add([jsonFilePath])
        // Commit the json file to the repository within the specified date range
        await git.commit(formatDateTime(currentDate), { '--date': currentDate.toISOString() })
        // Change the date for the next commit
        currentDate = new Date(currentDate.getTime() + timeBetweenCommits)
      }
      // Once finish the day set hours to 0 to start from the beginning
      currentDate.setHours(0, 0, 0, 0)
      // Then add one day to go to the next day until the end date
      currentDate = new Date(currentDate.getTime() + oneDay)
    }

    // Once finish committing push the commits to the repository
    console.log('Pushing commits to the repository...')
    await git.push()
    console.log('Mission accomplished! 🎉🎉🎉\nCheck your GitHub Contibutions Graph')
  } catch (error) {
    console.log(`Some crazy shit happened, figure it out: ${error.message}`)
  }
}

// Call the makeCommitsAndPush function to start the process
makeCommitsAndPush()

const faker = require('faker')

const NUM_PEOPLE = 100

// We create the tree relationship manually in DatoCMS because it's just easier
const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Facilities',
  'HR',
  'Payroll',
  'Accounts Receivable',
  'Design',
  'Web dev',
  'IT',
  'Security',
  'Legal',
  'Research',
  'Release Engineering',
  'GTM',
  'Partners',
  'Education',
  'Finance',
  'Quality Assurance',
  'Workplace',
  'Sanitation',
  'Recruiting'
]

// https://randomuser.me/api/portraits/men/54.jpg
const AVATAR_URL = `https://randomuser.me/api/portraits/`

module.exports = async client => {
  // Create new models & fields
  // Department
  const departmentModel = await client.itemTypes.create({
    name: 'Department',
    apiKey: 'department',
    tree: true
  })

  await client.fields.create(departmentModel.id, {
    label: 'Name',
    apiKey: 'name',
    fieldType: 'string',
    validators: {
      required: {}
    },
    appearance: {
      editor: 'single_line',
      parameters: {
        heading: true
      },
      addons: []
    }
  })

  // Person
  const personModel = await client.itemTypes.create({
    name: 'Person',
    apiKey: 'person'
  })

  await client.fields.create(personModel.id, {
    label: 'Name',
    apiKey: 'name',
    fieldType: 'string',
    appearance: {
      editor: 'single_line',
      parameters: {
        heading: true
      },
      addons: []
    }
  })

  await client.fields.create(personModel.id, {
    label: 'Title',
    apiKey: 'title',
    fieldType: 'string'
  })

  await client.fields.create(personModel.id, {
    label: 'Avatar',
    apiKey: 'avatar',
    fieldType: 'file'
  })

  await client.fields.create(personModel.id, {
    label: 'Department',
    apiKey: 'department',
    fieldType: 'link',
    validators: {
      itemItemType: {
        itemTypes: [departmentModel.id]
      }
    }
  })

  // Populate records for departments
  const createDepartments = DEPARTMENTS.map(async dept => {
    return await client.items.create({
      itemType: departmentModel.id,
      name: dept
    })
  })

  const createdDepartments = await Promise.all(createDepartments)

  console.log(`Created ${createdDepartments.length} department`)
  console.log(createdDepartments)

  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // Populate person records
  // Grab a random avatar image and use faker to populate data
  // This is slow, but :shrug
  for (let i = 0; i < NUM_PEOPLE; i++) {
    const randomAvatarNumber = generateRandomInt(1, 99)
    const randomDeptNumber = generateRandomInt(0, DEPARTMENTS.length - 1)
    const path = await client.createUploadPath(
      `${AVATAR_URL}${i < 50 ? 'men' : 'women'}/${randomAvatarNumber}.jpg`
    )
    const name = faker.name.findName()
    // Some records we don't want to have an avatar, this gives us a small percentage of
    // people who are missing one.
    const skipAvatar = randomAvatarNumber % 7 === 0
    console.log(`Created person number ${i}`)
    if (skipAvatar) {
      console.log(
        `Person ${name} shouldn't have an avatar. Value: ${randomAvatarNumber}`
      )
    }
    const upload = await client.uploads.create({ path })
    await client.items.create({
      itemType: personModel.id,
      name,
      title: faker.name.jobTitle(),
      department: createdDepartments[randomDeptNumber].id,
      avatar: skipAvatar ? null : { uploadId: upload.id }
    })
  }
}

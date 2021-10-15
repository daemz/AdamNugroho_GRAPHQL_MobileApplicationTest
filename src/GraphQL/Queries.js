import gql from "graphql-tag";

const LAUNCHES_QUERY = `
  query($pageSize:Int $after:String $missionPatch:PatchSize) {
    launches(pageSize:$pageSize after:$after) {
      cursor
      launches{
        id
        site
        rocket {
          id
          name
          type
        }
        mission {
          name
          missionPatch(size:$missionPatch)
        }
      }
    }
  }
`

const LAUNCHES = `
query{
  launches{
    cursor
    launches{
      id
      site
      rocket {
        id
        name
        type
      }
      mission {
        name
        missionPatch
      }
    }
  }
}
`

const LAUNCH_QUERY = `
  query($id:ID!){
    launch(id: $id){
      id
      site
      rocket {
        id
        name
        type
      }
      mission {
        name
        missionPatch(size:SMALL)
      }
    }
  }
`

const ME_QUERY = `
  query {
    me{
      id
      email
      profileImage
    }
  }
`

const missionPatch = { // the enumeration for missionpatch (PatchSize)
  SMALL: "SMALL",
  LARGE: "LARGE"
}

export {
  LAUNCHES,
  LAUNCHES_QUERY,
  LAUNCH_QUERY,
  ME_QUERY,

  missionPatch
}

export async function insertVideoStats(
    token,
    { favourited, watched, userId, videoId }
) {
    const operationsDoc = `
    mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      insert_stats_one(object: {
        favourited: $favourited, 
        userId: $userId, 
        watched: $watched, 
        videoId: $videoId
      }) {
          favourited
          userId
      }
    }
  `;
    const response = await queryHasuraGQL(
        operationsDoc,
        'insertStats',
        { favourited, watched, userId, videoId },
        token
    );
    return response;
}

export async function updateVideoStats(
    token,
    { favourited, watched, userId, videoId }
) {
    const operationsDoc = `
    mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      update_stats(
        _set: {watched: $watched, favourited: $favourited}, 
        where: {
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId}
        }) {
        returning {
          favourited,
          userId,
          watched,
          videoId
        }
      }
    }
    `;
    const response = await queryHasuraGQL(
        operationsDoc,
        'updateStats',
        { favourited, watched, userId, videoId },
        token
    );
    return response;
}

export async function findVideoById(token, userId, videoId) {
    const operationsDoc = `
    query findVideoById($userId: String!, $videoId: String!) {
      stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
        favourited
        id
        userId
        videoId
        watched
      }
    }
    `;
    const response = await queryHasuraGQL(
        operationsDoc,
        'findVideoById',
        { userId, videoId },
        token
    );
    return response?.data?.stats;
}

export async function createNewUser(token, metaData) {
    const { issuer, publicAddress, email } = metaData;
    const operationsDoc = `
    mutation createNewUser($email: String!,$issuer: String!, $publicAddress: String!) {
        insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
          returning {
            email
            id
            issuer
            publicAddress
          }
        }
    } 
  `;
    const response = await queryHasuraGQL(
        operationsDoc,
        'createNewUser',
        { issuer, email, publicAddress },
        token
    );
    return response;
}

export async function isNewUser(token, metaData) {
    const operationsDoc = `
    query checkUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        email
        id
        issuer
      }
    }
  `;
    const response = await queryHasuraGQL(
        operationsDoc,
        'checkUser',
        { issuer: metaData.issuer },
        token
    );
    return response?.data?.users?.length === 0;
}

export async function queryHasuraGQL(
    operationsDoc,
    operationName,
    variables,
    token
) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

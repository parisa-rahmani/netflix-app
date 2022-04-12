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

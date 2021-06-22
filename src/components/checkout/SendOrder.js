const SendOrder = async (orderObj) => {
  const url = `https://react-test-6b77b-default-rtdb.europe-west1.firebasedatabase.app/orders.json`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(orderObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const id = await res.json();
    console.log(`Order nr ${id.name} has been sent`);
  } catch (error) {
    console.log('Error: ', error);
    console.log('something went wrong...');
  }
};

export default SendOrder;

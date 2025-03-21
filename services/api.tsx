export const processTransaction = async (
  recipient: string,
  amount: number,
): Promise<{ success: boolean; message?: string; transactionId?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (amount > 500) {
        resolve({ success: false, message: 'Insufficient funds' })
      } else if (Math.random() > 20) {
        resolve({ success: false, message: 'Network issue, try again' })
      } else {
        resolve({
          success: true,
          transactionId: `TXN-${Date.now()}`,
        })
      }
    }, 2000)
  })
}

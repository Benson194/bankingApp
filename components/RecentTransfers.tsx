import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface RecentTransfersProps {
  onSelect: (name: string) => void
}

const RecentTransfers: React.FC<RecentTransfersProps> = ({ onSelect }) => {
  const history = useSelector((state: RootState) => state.transactions.history)

  return (
    <View>
      <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>
        Recent Transfers
      </Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.transactionId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item.recipient)}
            style={{ padding: 10 }}
          >
            <Text>
              {item.recipient} - ${item.amount}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default RecentTransfers

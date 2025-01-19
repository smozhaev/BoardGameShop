import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Colors } from '@shared/constants';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '@features/cart/model/hooks';
import { Text, View } from 'react-native';
import { useColorScheme } from '@shared/hooks/useColorScheme'
import { useClientOnlyValue } from '@shared/hooks/useClientOnlyValue';

// смотреть иконки здесь, в фильтре иконок выбрать "FontAwesome" https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  badge?: number;
}) {
  return (
    <View>
      <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
      {props.badge ? (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -4,
          backgroundColor: '#ff6b6b',
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
            {props.badge}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { totalItems } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />  
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Магазин',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
          // headerRight: () => (
          //   <Link href="/cart" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="shopping-cart"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="tournaments"
        options={{
          title: 'Турниры',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Корзина',
          tabBarIcon: ({ color }) => (
            <TabBarIcon 
              name="shopping-cart" 
              color={color} 
              badge={totalItems > 0 ? totalItems : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

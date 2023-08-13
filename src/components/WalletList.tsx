/* eslint-disable no-case-declarations */
import { useEffect, useState } from 'react';
import useWalletsStore from '../store/store';
import { Wallet } from '../types';
import {FormControl,   Table,
  Thead,Tbody,
  Tr,Td,
  Th} from '@chakra-ui/react'


export const WalletList = () => {
  const walletsData = useWalletsStore.getState().wallets

  const [orderedData, setOrderedData] = useState<Wallet[]>(walletsData);

  useEffect(() => {
    if (walletsData.length) {
      setOrderedData(sort('id', true, walletsData));
    }
  }, [walletsData]);

  const handleSorting = (name: keyof Wallet, isDesc: boolean) => {
    const newOrderedData = sort(name, isDesc, [...orderedData]);
    setOrderedData(newOrderedData);
  };

  const sort = (name: keyof Wallet, isDesc: boolean, data: Wallet[]) => {
    const newOrderedData = [...data];
    newOrderedData?.sort((a, b) => {
      let r = 0;
      switch (typeof a[name]) {
        case 'string':
          const stringA = a[name] as string;
          const stringB = b[name] as string;
          r = isDesc ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
          break;
        case 'number':
        case 'boolean':
          const numberA = a[name] as number;
          const numberB = b[name] as number;
          r = isDesc ? numberA - numberB : numberB - numberA;
          break;
        default:
          break;
      }
      return r;
    });
    return newOrderedData;
  };

  if (!orderedData.length) return null;

  return (
    <Table >
      <Thead>
        <Tr>
          <Th>
            <ColumnHeader name={'#'} sort={handleSorting} />
          </Th>
          <Th>
            <ColumnHeader name={'Wallet'} sort={handleSorting} />
          </Th>
          <Th>
            <ColumnHeader name={'Favorite'} sort={handleSorting} />
          </Th>
        </Tr>
      </Thead>
      <Tbody key={row.id}>
        {orderedData.map((row) => (
          <Tr
            key={row.id}
            onClick={() => {
              // useWalletsStore.getState().pickOne(row.address);
            }}
          >
            <Td>{row.id}</Td>
            <Td>{row.address}</Td>
            <Td>
              <FormControl
                type="checkbox"
                checked={row.isFavorite}
                // onChange={() => useWalletsStore.getState().toggleFavorite(row.id, !row.isFavorite)}
              ></FormControl>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const ColumnHeader = ({
  name,
  sort,
}: {
  name: string;
  sort: (columnName: keyof Wallet, isDesc: boolean) => void;
}) => {
  const [isDesc, setIsDesc] = useState(true);

  useEffect(() => {
    const attribute = () => {
      let r: keyof Wallet = 'id';
      switch (name) {
        case '#':
          r = 'id';
          break;
        case 'Wallet':
          r = 'address';
          break;
        case 'Favorite':
          r = 'isFavorite';
          break;
      }
      return r;
    };
    sort(attribute(), isDesc);
  }, [isDesc, name]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{name}</div>
      <div style={{ cursor: 'pointer' }} onClick={() => setIsDesc(!isDesc)}>
        {isDesc ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>}
      </div>
    </div>
  );
};

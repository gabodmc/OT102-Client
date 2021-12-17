import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Text, Image, Button,
} from '@chakra-ui/react'
import Spinner from '../../components/Spinner'
import { getAllEntries, delEntry } from '../../services/entriesService'
import Alert from '../../components/alert/Alert'

const ListNews = () => {
  const [news, setNews] = useState([])
  const [deletedNew, setDeletedNew] = useState([])
  const [alertProps, setAlertprops] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await getAllEntries()
        setNews(response.data.body)
      } catch (error) {
        const errorAlertProps = {
          show: true,
          title: 'Ooops, algo ha fallado!',
          message: error.message,
          icon: 'error',
          onConfirm: () => {},
        }
        setAlertprops(errorAlertProps)
      }
    }
    getContacts()
  }, [deletedNew])

  const handleDelete = (id) => {
    try {
      delEntry(id)
      setDeletedNew(id)
    } catch (error) {
      const errorAlertProps = {
        show: true,
        title: 'Ooops, algo ha fallado!',
        message: error.message,
        icon: 'error',
        onConfirm: () => {},
      }
      setAlertprops(errorAlertProps)
    }
  }

  return (
    <>
      <Alert {...alertProps} />
      <Box
        mt="30px"
        d="flex"
        justifyContent="center"
        alignItems="center"
        p="5px"
        flexDirection="column"
        textAlign="center"
      >
        <Text fontSize="2xl" mb="30px">
          Contactos
        </Text>
        {news.length > 0 ? (
          <Table size="sm" textAlign="center">
            <Thead bg="brand.cyan">
              <Tr>
                <Th textAlign="center">Nombre</Th>
                <Th textAlign="center">Imagen</Th>
                <Th textAlign="center">Fecha de creación</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {news.map((item) => (
                <Tr key={item.id}>
                  <Td textAlign="center">{item.name}</Td>
                  <Td>
                    {' '}
                    <Image boxSize="150px" objectFit="cover" src={item.image} alt="Dan Abramov" />
                  </Td>
                  <Td textAlign="center">{item.createdAt}</Td>
                  <Td textAlign="center">
                    {' '}
                    <Link to={`/activities/${item.id}`}>
                      <Button
                        fontWeight={600}
                        bg="brand.yellow"
                        _hover={{
                          bg: 'brand.gray1',
                        }}
                      >
                        Editar
                      </Button>
                    </Link>
                    {' '}
                    <Button
                      fontWeight={600}
                      bg="brand.rouge"
                      onClick={() => handleDelete(item.id)}
                      // onClick={handleDelete(item.id)}
                      _hover={{
                        bg: 'brand.gray1',
                      }}
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Spinner />
        )}
      </Box>
    </>
  )
}

export default ListNews
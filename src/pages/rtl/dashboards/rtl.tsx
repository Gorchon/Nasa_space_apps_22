/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import Usa from '/public/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { ChakraNextAvatar, NextAvatar } from 'components/image/Avatar';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import CheckTable from 'components/rtl/dashboard/CheckTable';
import ComplexTable from 'components/rtl/dashboard/ComplexTable';
import DailyTraffic from 'components/rtl/dashboard/DailyTraffic';
import PieCard from 'components/rtl/dashboard/PieCard';
import Tasks from 'components/rtl/dashboard/Tasks';
import TotalSpent from 'components/rtl/dashboard/TotalSpent';
import WeeklyRevenue from 'components/rtl/dashboard/WeeklyRevenue';
import {
  columnsDataCheck,
  columnsDataComplex,
} from 'variables/dashboards/rtl/columnsData';
import tableDataCheck from 'variables/dashboards/rtl/tableDataCheck.json';
import tableDataComplex from 'variables/dashboards/rtl/tableDataComplex.json';
import RtlLayout from 'layouts/rtl/RtlLayout';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  return (
    <RtlLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
                }
              />
            }
            name="Earnings"
            value="$350.4"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdAttachMoney}
                    color={brandColor}
                  />
                }
              />
            }
            name="Spend this month"
            value="$642.39"
          />
          <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
          <MiniStatistics
            startContent={
              <Box height={'56px'} width={'56px'}>
                <ChakraNextAvatar src={Usa} height={'56px'} width={'56px'} />
              </Box>
            }
            endContent={
              <Flex mt="10px">
                <Select
                  id="balance"
                  variant="mini"
                  mt="5px"
                  me="0px"
                  defaultValue="usd"
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gba">GBA</option>
                </Select>
              </Flex>
            }
            name="Your balance"
            value="$1,000"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="New Tasks"
            value="154"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
                }
              />
            }
            name="Total Projects"
            value="2935"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <TotalSpent />
          <WeeklyRevenue />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <DailyTraffic />
            <PieCard />
          </SimpleGrid>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <Tasks />
            <MiniCalendar h="100%" minW="100%" selectRange={false} />
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    </RtlLayout>
  );
}

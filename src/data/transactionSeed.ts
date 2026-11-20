// AUTO-GENERATED from the anonymized Transaction Report export (Jun–Nov 2026).
// Franchise names, company names and invoice numbers are dummy values (dm_XXXXXX).
// Dates, descriptions, amounts, paid status and bill payment/royalty splits are from the source report.
import type { Bill, Company, FeeOverride, Franchise, Invoice } from '../types/fas';

export const reportFranchises: Franchise[] = [
  {
    "id": "fr-01",
    "name": "FA0001",
    "territory": "Dallas–Fort Worth, TX",
    "royaltyPct": 25,
    "feePct": 0
  },
  {
    "id": "fr-02",
    "name": "FA0002",
    "territory": "Houston, TX",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-03",
    "name": "FA0003",
    "territory": "Phoenix, AZ",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-04",
    "name": "FA0004",
    "territory": "Atlanta, GA",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-05",
    "name": "FA0005",
    "territory": "Tampa, FL",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-06",
    "name": "FA0006",
    "territory": "Charlotte, NC",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-07",
    "name": "FA0007",
    "territory": "Nashville, TN",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-08",
    "name": "FA0008",
    "territory": "Denver, CO",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-09",
    "name": "FA0009",
    "territory": "Orlando, FL",
    "royaltyPct": 25,
    "feePct": 0
  },
  {
    "id": "fr-10",
    "name": "FA0010",
    "territory": "San Antonio, TX",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fr-11",
    "name": "FA0011",
    "territory": "Raleigh–Durham, NC",
    "royaltyPct": 25,
    "feePct": 0
  },
  {
    "id": "fr-12",
    "name": "FA0012",
    "territory": "Las Vegas, NV",
    "royaltyPct": 25,
    "feePct": 0
  },
  {
    "id": "fr-13",
    "name": "FA0013",
    "territory": "Internal QA",
    "royaltyPct": 25,
    "feePct": 0
  }
];

export const reportCompanies: Company[] = [
  {
    "id": "co-01-1",
    "franchiseId": "fr-01",
    "name": "Lakeside Credit Union"
  },
  {
    "id": "co-01-2",
    "franchiseId": "fr-01",
    "name": "Highland Elementary School"
  },
  {
    "id": "co-01-3",
    "franchiseId": "fr-01",
    "name": "Riverbend Fitness Club"
  },
  {
    "id": "co-01-4",
    "franchiseId": "fr-01",
    "name": "Bayside Retail Center"
  },
  {
    "id": "co-01-5",
    "franchiseId": "fr-01",
    "name": "Heritage Senior Living"
  },
  {
    "id": "co-01-6",
    "franchiseId": "fr-01",
    "name": "Fairway Community Church"
  },
  {
    "id": "co-01-7",
    "franchiseId": "fr-01",
    "name": "Union Property Management"
  },
  {
    "id": "co-01-8",
    "franchiseId": "fr-01",
    "name": "Riverbend Credit Union"
  },
  {
    "id": "co-02-1",
    "franchiseId": "fr-02",
    "name": "Lakeside Apartments"
  },
  {
    "id": "co-02-2",
    "franchiseId": "fr-02",
    "name": "Silverline Data Center"
  },
  {
    "id": "co-03-1",
    "franchiseId": "fr-03",
    "name": "Clearview Office Park"
  },
  {
    "id": "co-03-2",
    "franchiseId": "fr-03",
    "name": "Sterling Apartments"
  },
  {
    "id": "co-03-3",
    "franchiseId": "fr-03",
    "name": "Stonebridge Office Park"
  },
  {
    "id": "co-03-4",
    "franchiseId": "fr-03",
    "name": "Harbor Credit Union"
  },
  {
    "id": "co-03-5",
    "franchiseId": "fr-03",
    "name": "Eastwood Auto Group"
  },
  {
    "id": "co-03-6",
    "franchiseId": "fr-03",
    "name": "Crescent Fitness Club"
  },
  {
    "id": "co-04-1",
    "franchiseId": "fr-04",
    "name": "Stonebridge Apartments"
  },
  {
    "id": "co-04-2",
    "franchiseId": "fr-04",
    "name": "Silverline Apartments"
  },
  {
    "id": "co-04-3",
    "franchiseId": "fr-04",
    "name": "Stonebridge Logistics Center"
  },
  {
    "id": "co-05-1",
    "franchiseId": "fr-05",
    "name": "Aspen Hotel & Suites"
  },
  {
    "id": "co-06-1",
    "franchiseId": "fr-06",
    "name": "Redstone Pediatrics"
  },
  {
    "id": "co-07-1",
    "franchiseId": "fr-07",
    "name": "Bayside Hotel & Suites"
  },
  {
    "id": "co-08-1",
    "franchiseId": "fr-08",
    "name": "Sterling Family Practice"
  },
  {
    "id": "co-09-1",
    "franchiseId": "fr-09",
    "name": "Fairway Medical Plaza"
  },
  {
    "id": "co-09-2",
    "franchiseId": "fr-09",
    "name": "Ironwood Self Storage"
  },
  {
    "id": "co-09-3",
    "franchiseId": "fr-09",
    "name": "Oakridge Business Center"
  },
  {
    "id": "co-10-1",
    "franchiseId": "fr-10",
    "name": "Fairway Property Management"
  },
  {
    "id": "co-11-1",
    "franchiseId": "fr-11",
    "name": "Bluewater Apartments"
  },
  {
    "id": "co-12-1",
    "franchiseId": "fr-12",
    "name": "Redstone Retail Center"
  },
  {
    "id": "co-13-1",
    "franchiseId": "fr-13",
    "name": "Cedar Data Center"
  }
];

export const reportInvoices: Invoice[] = [
  {
    "id": "inv-533669",
    "number": "dm_533669",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-11-18",
    "dueDate": "2026-12-03",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-566",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-973963",
    "number": "dm_973963",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-11-18",
    "dueDate": "2026-12-03",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-567",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-193505",
    "number": "dm_193505",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-11-17",
    "dueDate": "2026-12-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-347",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-164249",
    "number": "dm_164249",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-11-17",
    "dueDate": "2026-12-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-459",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-363880",
    "number": "dm_363880",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-11-17",
    "dueDate": "2026-12-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-460",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-560792",
    "number": "dm_560792",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-11-13",
    "dueDate": "2026-11-28",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-456",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-797878",
    "number": "dm_797878",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-11-13",
    "dueDate": "2026-11-28",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-457",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-994795",
    "number": "dm_994795",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-11-13",
    "dueDate": "2026-11-28",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-458",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-701374",
    "number": "dm_701374",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-11-12",
    "dueDate": "2026-11-27",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-506",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-710736",
    "number": "dm_710736",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-11-12",
    "dueDate": "2026-11-27",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-507",
        "description": "Filter Replacement - Coil Cleaning / Debris Removal",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-493824",
    "number": "dm_493824",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-11-11",
    "dueDate": "2026-11-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-346",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 3.45,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-811792",
    "number": "dm_811792",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-11-11",
    "dueDate": "2026-11-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-505",
        "description": "Filter Replacement - Coil Cleaning / Debris Removal",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-314219",
    "number": "dm_314219",
    "franchiseId": "fr-11",
    "companyId": "co-11-1",
    "invoiceDate": "2026-11-11",
    "dueDate": "2026-11-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-574",
        "description": "Filter Replacement - 16x16x2 M4",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Raleigh–Durham, NC"
  },
  {
    "id": "inv-752130",
    "number": "dm_752130",
    "franchiseId": "fr-13",
    "companyId": "co-13-1",
    "invoiceDate": "2026-11-11",
    "dueDate": "2026-11-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-583",
        "description": "Filter Replacement - 10x30x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Internal QA"
  },
  {
    "id": "inv-807222",
    "number": "dm_807222",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-11-09",
    "dueDate": "2026-11-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-521",
        "description": "Filter Replacement - 14x25x2",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      },
      {
        "id": "li-522",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-669781",
    "number": "dm_669781",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-11-06",
    "dueDate": "2026-11-21",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-345",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-601338",
    "number": "dm_601338",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-11-06",
    "dueDate": "2026-11-21",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-454",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-981416",
    "number": "dm_981416",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-11-06",
    "dueDate": "2026-11-21",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-455",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-243725",
    "number": "dm_243725",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-340",
        "description": "Filter Replacement - 18x25x2",
        "quantity": 1,
        "unitPrice": 42.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-380093",
    "number": "dm_380093",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-341",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-633752",
    "number": "dm_633752",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-342",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-438522",
    "number": "dm_438522",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-343",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-603656",
    "number": "dm_603656",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-344",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 157.5,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-698987",
    "number": "dm_698987",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-451",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-924793",
    "number": "dm_924793",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-11-05",
    "dueDate": "2026-11-20",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-452",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      },
      {
        "id": "li-453",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 87.5,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-758600",
    "number": "dm_758600",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-11-02",
    "dueDate": "2026-11-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-339",
        "description": "Filter Replacement - Unit 1 (Quad Filter)",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-578562",
    "number": "dm_578562",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-30",
    "dueDate": "2026-11-14",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-336",
        "description": "Filter Replacement - 14x25x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-518964",
    "number": "dm_518964",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-30",
    "dueDate": "2026-11-14",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-337",
        "description": "Filter Replacement - Unit 1 - Double Filter",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-274842",
    "number": "dm_274842",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-10-30",
    "dueDate": "2026-11-14",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-338",
        "description": "Filter Replacement - Unit 1 (Quad Filter)",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-397753",
    "number": "dm_397753",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-10-29",
    "dueDate": "2026-11-13",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-375",
        "description": "Filter Replacement - New Customer 20% Discount",
        "quantity": 1,
        "unitPrice": -104.0,
        "tax": 0
      },
      {
        "id": "li-376",
        "description": "Filter Replacement - Rooftop Unit Filter Replacement (7 Units)",
        "quantity": 1,
        "unitPrice": 520.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-211771",
    "number": "dm_211771",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-10-28",
    "dueDate": "2026-11-12",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-335",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-813925",
    "number": "dm_813925",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-10-28",
    "dueDate": "2026-11-12",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-504",
        "description": "Filter Replacement - Unit",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-241197",
    "number": "dm_241197",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-27",
    "dueDate": "2026-11-11",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-334",
        "description": "Filter Replacement - Unit 1 - Total Filter Replacement",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-990479",
    "number": "dm_990479",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-24",
    "dueDate": "2026-11-08",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-332",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-116754",
    "number": "dm_116754",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-24",
    "dueDate": "2026-11-08",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-333",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-891956",
    "number": "dm_891956",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-326",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-693515",
    "number": "dm_693515",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-327",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-401039",
    "number": "dm_401039",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-328",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-199452",
    "number": "dm_199452",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-329",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-403809",
    "number": "dm_403809",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-330",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-514759",
    "number": "dm_514759",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-331",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-634554",
    "number": "dm_634554",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-502",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-244707",
    "number": "dm_244707",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-503",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-667102",
    "number": "dm_667102",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-520",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 170.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-770784",
    "number": "dm_770784",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-10-23",
    "dueDate": "2026-11-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-564",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      },
      {
        "id": "li-565",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 150.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-782756",
    "number": "dm_782756",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-10-21",
    "dueDate": "2026-11-05",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-563",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-362362",
    "number": "dm_362362",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-20",
    "dueDate": "2026-11-04",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-325",
        "description": "Filter Replacement - Full Unit Filter Replacement",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-889355",
    "number": "dm_889355",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-10-19",
    "dueDate": "2026-11-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-561",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-656724",
    "number": "dm_656724",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-10-19",
    "dueDate": "2026-11-03",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-562",
        "description": "Filter Replacement - 18x18x2",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-606505",
    "number": "dm_606505",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-309",
        "description": "Filter Replacement - 14x25x2",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-618244",
    "number": "dm_618244",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-310",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-241551",
    "number": "dm_241551",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-311",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-109684",
    "number": "dm_109684",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-312",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-550454",
    "number": "dm_550454",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-313",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-760666",
    "number": "dm_760666",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-314",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-250346",
    "number": "dm_250346",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-315",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-665287",
    "number": "dm_665287",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-316",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-641455",
    "number": "dm_641455",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-317",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-429184",
    "number": "dm_429184",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-318",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-259489",
    "number": "dm_259489",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-319",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 135.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-923291",
    "number": "dm_923291",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-320",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-520203",
    "number": "dm_520203",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-321",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-528077",
    "number": "dm_528077",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-322",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-578806",
    "number": "dm_578806",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-323",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 65.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-706038",
    "number": "dm_706038",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-324",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-351249",
    "number": "dm_351249",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-10-16",
    "dueDate": "2026-10-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-450",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-981621",
    "number": "dm_981621",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-10-15",
    "dueDate": "2026-10-30",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-449",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-867435",
    "number": "dm_867435",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-10-14",
    "dueDate": "2026-10-29",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-373",
        "description": "Filter Replacement - Rooftop Unit Filter Replacement",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-710960",
    "number": "dm_710960",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-10-14",
    "dueDate": "2026-10-29",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-374",
        "description": "Filter Replacement - Rooftop Unit Filter Replacement",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-245360",
    "number": "dm_245360",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-10-14",
    "dueDate": "2026-10-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-560",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-913177",
    "number": "dm_913177",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-10-13",
    "dueDate": "2026-10-28",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-500",
        "description": "Filter Replacement - Units 9-11",
        "quantity": 1,
        "unitPrice": 0.0,
        "tax": 0
      },
      {
        "id": "li-501",
        "description": "Filter Replacement - Units 1-8",
        "quantity": 1,
        "unitPrice": 600.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-423498",
    "number": "dm_423498",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-12",
    "dueDate": "2026-10-27",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-305",
        "description": "Filter Replacement - Total Filter Replacement",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-306",
        "description": "Filter Replacement - Total Filter Replacement",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      },
      {
        "id": "li-307",
        "description": "Filter Replacement - Unit 2 - No Charge",
        "quantity": 1,
        "unitPrice": 0.0,
        "tax": 0
      },
      {
        "id": "li-308",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-982607",
    "number": "dm_982607",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-10-12",
    "dueDate": "2026-10-27",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-559",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 240.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-960036",
    "number": "dm_960036",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-10-10",
    "dueDate": "2026-10-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-302",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-999016",
    "number": "dm_999016",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-10",
    "dueDate": "2026-10-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-303",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-961549",
    "number": "dm_961549",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-10",
    "dueDate": "2026-10-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-304",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-958471",
    "number": "dm_958471",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-290",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-257398",
    "number": "dm_257398",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-291",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-372511",
    "number": "dm_372511",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-292",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-479536",
    "number": "dm_479536",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-293",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-389465",
    "number": "dm_389465",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-294",
        "description": "Filter Replacement - Total Filter Replacement",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      },
      {
        "id": "li-295",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-637475",
    "number": "dm_637475",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-296",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      },
      {
        "id": "li-297",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 300.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-849237",
    "number": "dm_849237",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-298",
        "description": "Filter Replacement - 14x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-299",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-584981",
    "number": "dm_584981",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-300",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-650055",
    "number": "dm_650055",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-301",
        "description": "Filter Replacement - 20x24x1",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-654522",
    "number": "dm_654522",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-446",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-154780",
    "number": "dm_154780",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-447",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-711068",
    "number": "dm_711068",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-10-09",
    "dueDate": "2026-10-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-448",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-851635",
    "number": "dm_851635",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-10-08",
    "dueDate": "2026-10-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-556",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-557",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      },
      {
        "id": "li-558",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-811553",
    "number": "dm_811553",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "invoiceDate": "2026-10-08",
    "dueDate": "2026-10-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-573",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "San Antonio, TX"
  },
  {
    "id": "inv-708071",
    "number": "dm_708071",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-07",
    "dueDate": "2026-10-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-283",
        "description": "Filter Replacement - Unit 1 - Filter replacement",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      },
      {
        "id": "li-284",
        "description": "Filter Replacement - Unit 2 - Filter replacement",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-227460",
    "number": "dm_227460",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-07",
    "dueDate": "2026-10-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-285",
        "description": "Filter Replacement - 18x25x2",
        "quantity": 1,
        "unitPrice": 42.0,
        "tax": 0
      },
      {
        "id": "li-286",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      },
      {
        "id": "li-287",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      },
      {
        "id": "li-288",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      },
      {
        "id": "li-289",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 157.5,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-448110",
    "number": "dm_448110",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-10-06",
    "dueDate": "2026-10-21",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-555",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-450077",
    "number": "dm_450077",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "invoiceDate": "2026-10-06",
    "dueDate": "2026-10-21",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-572",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "San Antonio, TX"
  },
  {
    "id": "inv-771825",
    "number": "dm_771825",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "invoiceDate": "2026-10-05",
    "dueDate": "2026-10-20",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-530",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Denver, CO"
  },
  {
    "id": "inv-732509",
    "number": "dm_732509",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-10-05",
    "dueDate": "2026-10-20",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-554",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-421746",
    "number": "dm_421746",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-273",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 105.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-178968",
    "number": "dm_178968",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-274",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 140.0,
        "tax": 0
      },
      {
        "id": "li-275",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-487391",
    "number": "dm_487391",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-276",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-334479",
    "number": "dm_334479",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-277",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-701480",
    "number": "dm_701480",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-278",
        "description": "Filter Replacement - 25x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-279144",
    "number": "dm_279144",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-279",
        "description": "Filter Replacement - 20x35x2",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      },
      {
        "id": "li-280",
        "description": "Filter Replacement - 18x18x2",
        "quantity": 1,
        "unitPrice": 360.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-453832",
    "number": "dm_453832",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-281",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-282",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-621349",
    "number": "dm_621349",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-492",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-493",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-494",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-495",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-496",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-497",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-498",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 38.0,
        "tax": 0
      },
      {
        "id": "li-499",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-202438",
    "number": "dm_202438",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-10-02",
    "dueDate": "2026-10-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-553",
        "description": "Filter Replacement - Filter",
        "quantity": 1,
        "unitPrice": 206.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-232595",
    "number": "dm_232595",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-10-01",
    "dueDate": "2026-10-16",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-272",
        "description": "Filter Replacement - Unit 1 - Total Filter Replacement",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-118640",
    "number": "dm_118640",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-10-01",
    "dueDate": "2026-10-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-369",
        "description": "Filter Replacement - Interior Filter Replacement",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-370",
        "description": "Filter Replacement - Rooftop Unit Filter Replacement",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-611737",
    "number": "dm_611737",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-10-01",
    "dueDate": "2026-10-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-371",
        "description": "Filter Replacement - Interior Filter Replacement",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-372",
        "description": "Filter Replacement - Rooftop Unit Filter Replacement",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-165045",
    "number": "dm_165045",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-10-01",
    "dueDate": "2026-10-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-445",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-165145",
    "number": "dm_165145",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-09-30",
    "dueDate": "2026-10-15",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-271",
        "description": "Filter Replacement - Total Filter Replacement",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-491568",
    "number": "dm_491568",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-09-30",
    "dueDate": "2026-10-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-442",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-704915",
    "number": "dm_704915",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-09-30",
    "dueDate": "2026-10-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-443",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-184359",
    "number": "dm_184359",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-30",
    "dueDate": "2026-10-15",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-444",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-339819",
    "number": "dm_339819",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-09-30",
    "dueDate": "2026-10-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-551",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-769513",
    "number": "dm_769513",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-30",
    "dueDate": "2026-10-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-552",
        "description": "Filter Replacement - Service",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-821867",
    "number": "dm_821867",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-29",
    "dueDate": "2026-10-14",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-550",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-813385",
    "number": "dm_813385",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-28",
    "dueDate": "2026-10-13",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-270",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 258.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-920869",
    "number": "dm_920869",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-26",
    "dueDate": "2026-10-11",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-491",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-171539",
    "number": "dm_171539",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-257",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-782496",
    "number": "dm_782496",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-258",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-259",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-338334",
    "number": "dm_338334",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-260",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-813353",
    "number": "dm_813353",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-261",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-899908",
    "number": "dm_899908",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-262",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-244005",
    "number": "dm_244005",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-263",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 85.0,
        "tax": 0
      },
      {
        "id": "li-264",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 85.0,
        "tax": 0
      },
      {
        "id": "li-265",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 85.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-925651",
    "number": "dm_925651",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-266",
        "description": "General Service - Labor",
        "quantity": 1,
        "unitPrice": 0.0,
        "tax": 0
      },
      {
        "id": "li-267",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 43.75,
        "tax": 0
      },
      {
        "id": "li-268",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 43.76,
        "tax": 0
      },
      {
        "id": "li-269",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 87.48,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-897317",
    "number": "dm_897317",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-488",
        "description": "16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-735837",
    "number": "dm_735837",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-489",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 300.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-381889",
    "number": "dm_381889",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-490",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-648086",
    "number": "dm_648086",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-529",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Denver, CO"
  },
  {
    "id": "inv-903530",
    "number": "dm_903530",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-547",
        "description": "Filter Replacement - Service",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-906401",
    "number": "dm_906401",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-25",
    "dueDate": "2026-10-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-548",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 160.02,
        "tax": 0
      },
      {
        "id": "li-549",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 160.02,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-224163",
    "number": "dm_224163",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-09-24",
    "dueDate": "2026-10-09",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-437",
        "description": "Filter Replacement - 20x30x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-780484",
    "number": "dm_780484",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-24",
    "dueDate": "2026-10-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-438",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-688853",
    "number": "dm_688853",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-09-24",
    "dueDate": "2026-10-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-439",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-850442",
    "number": "dm_850442",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-09-24",
    "dueDate": "2026-10-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-440",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-925638",
    "number": "dm_925638",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-09-24",
    "dueDate": "2026-10-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-441",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-888492",
    "number": "dm_888492",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-09-24",
    "dueDate": "2026-10-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-546",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-181513",
    "number": "dm_181513",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-09-23",
    "dueDate": "2026-10-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-366",
        "description": "Filter Replacement - Interior Filter Replacement",
        "quantity": 1,
        "unitPrice": 10.0,
        "tax": 0
      },
      {
        "id": "li-367",
        "description": "Filter Replacement - Exterior Filter Service",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-707791",
    "number": "dm_707791",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-09-23",
    "dueDate": "2026-10-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-368",
        "description": "Filter Replacement - Exterior Filter Service",
        "quantity": 1,
        "unitPrice": 110.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-408888",
    "number": "dm_408888",
    "franchiseId": "fr-07",
    "companyId": "co-07-1",
    "invoiceDate": "2026-09-23",
    "dueDate": "2026-10-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-524",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 30.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Nashville, TN"
  },
  {
    "id": "inv-625071",
    "number": "dm_625071",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "invoiceDate": "2026-09-23",
    "dueDate": "2026-10-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-568",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "San Antonio, TX"
  },
  {
    "id": "inv-579660",
    "number": "dm_579660",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "invoiceDate": "2026-09-23",
    "dueDate": "2026-10-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-569",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-570",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "San Antonio, TX"
  },
  {
    "id": "inv-947636",
    "number": "dm_947636",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "invoiceDate": "2026-09-23",
    "dueDate": "2026-10-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-571",
        "description": "Filter Replacement - 12x24x1",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "San Antonio, TX"
  },
  {
    "id": "inv-136628",
    "number": "dm_136628",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-22",
    "dueDate": "2026-10-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-436",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-953905",
    "number": "dm_953905",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-09-22",
    "dueDate": "2026-10-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-542",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-694608",
    "number": "dm_694608",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-22",
    "dueDate": "2026-10-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-543",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-179819",
    "number": "dm_179819",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-22",
    "dueDate": "2026-10-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-544",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-492643",
    "number": "dm_492643",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-22",
    "dueDate": "2026-10-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-545",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-321766",
    "number": "dm_321766",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-09-21",
    "dueDate": "2026-10-06",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-519",
        "description": "Filter Replacement - 1 Unit",
        "quantity": 1,
        "unitPrice": 125.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-462301",
    "number": "dm_462301",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-245",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      },
      {
        "id": "li-246",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      },
      {
        "id": "li-247",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-723389",
    "number": "dm_723389",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-248",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      },
      {
        "id": "li-249",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-906382",
    "number": "dm_906382",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-250",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      },
      {
        "id": "li-251",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-666804",
    "number": "dm_666804",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-252",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      },
      {
        "id": "li-253",
        "description": "Filter Replacement - 14x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-848637",
    "number": "dm_848637",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-254",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      },
      {
        "id": "li-255",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      },
      {
        "id": "li-256",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-950363",
    "number": "dm_950363",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-435",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 192.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-494545",
    "number": "dm_494545",
    "franchiseId": "fr-06",
    "companyId": "co-06-1",
    "invoiceDate": "2026-09-18",
    "dueDate": "2026-10-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-523",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 30.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Charlotte, NC"
  },
  {
    "id": "inv-614668",
    "number": "dm_614668",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-17",
    "dueDate": "2026-10-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-242",
        "description": "General Service - Residential Unit - Coil Cleaning",
        "quantity": 1,
        "unitPrice": 0.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-155630",
    "number": "dm_155630",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-09-17",
    "dueDate": "2026-10-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-243",
        "description": "General Service - Primary RTU - Coil Cleaning",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-656188",
    "number": "dm_656188",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-17",
    "dueDate": "2026-10-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-244",
        "description": "General Service - Make Up Air Unit - All Filter Cleaning",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-352343",
    "number": "dm_352343",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-17",
    "dueDate": "2026-10-02",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-433",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-837721",
    "number": "dm_837721",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-09-17",
    "dueDate": "2026-10-02",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-434",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-985702",
    "number": "dm_985702",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-09-17",
    "dueDate": "2026-10-02",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-518",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-612949",
    "number": "dm_612949",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-16",
    "dueDate": "2026-10-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-432",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-390526",
    "number": "dm_390526",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-16",
    "dueDate": "2026-10-01",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-487",
        "description": "Filter Replacement - 14x25x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-552133",
    "number": "dm_552133",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-09-16",
    "dueDate": "2026-10-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-517",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 210.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-403258",
    "number": "dm_403258",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-09-16",
    "dueDate": "2026-10-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-538",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 220.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-324456",
    "number": "dm_324456",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-16",
    "dueDate": "2026-10-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-539",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-886381",
    "number": "dm_886381",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-16",
    "dueDate": "2026-10-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-540",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 30.0,
        "tax": 0
      },
      {
        "id": "li-541",
        "description": "Filter Replacement - 20x24x1",
        "quantity": 1,
        "unitPrice": 30.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-460629",
    "number": "dm_460629",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-09-15",
    "dueDate": "2026-09-30",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-364",
        "description": "Filter Replacement - Interior Filter Service",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      },
      {
        "id": "li-365",
        "description": "Filter Replacement - Exterior Filter Service",
        "quantity": 1,
        "unitPrice": 280.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-661979",
    "number": "dm_661979",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-09-14",
    "dueDate": "2026-09-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-428",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      },
      {
        "id": "li-429",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-430",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-431",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-588071",
    "number": "dm_588071",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "invoiceDate": "2026-09-14",
    "dueDate": "2026-09-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-527",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Denver, CO"
  },
  {
    "id": "inv-974863",
    "number": "dm_974863",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "invoiceDate": "2026-09-14",
    "dueDate": "2026-09-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-528",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 400.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Denver, CO"
  },
  {
    "id": "inv-679610",
    "number": "dm_679610",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-206",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-821477",
    "number": "dm_821477",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-207",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-856687",
    "number": "dm_856687",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-208",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-702150",
    "number": "dm_702150",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-209",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 41.0,
        "tax": 0
      },
      {
        "id": "li-210",
        "description": "Filter Replacement - 16x24x2",
        "quantity": 1,
        "unitPrice": 61.5,
        "tax": 0
      },
      {
        "id": "li-211",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 82.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-889575",
    "number": "dm_889575",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-212",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 74.6,
        "tax": 0
      },
      {
        "id": "li-213",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 111.9,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-511911",
    "number": "dm_511911",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-214",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 37.3,
        "tax": 0
      },
      {
        "id": "li-215",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 37.3,
        "tax": 0
      },
      {
        "id": "li-216",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 111.9,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-584939",
    "number": "dm_584939",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-217",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 31.1,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-762671",
    "number": "dm_762671",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-218",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 31.1,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-736713",
    "number": "dm_736713",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-219",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 62.2,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-194059",
    "number": "dm_194059",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-220",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 62.2,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-945078",
    "number": "dm_945078",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-221",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 186.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-577682",
    "number": "dm_577682",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-222",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 28.7,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-672860",
    "number": "dm_672860",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-223",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 43.05,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-785608",
    "number": "dm_785608",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-224",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 57.4,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-350691",
    "number": "dm_350691",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-225",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 57.4,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-872480",
    "number": "dm_872480",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-226",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 23.2,
        "tax": 0
      },
      {
        "id": "li-227",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 23.2,
        "tax": 0
      },
      {
        "id": "li-228",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 46.4,
        "tax": 0
      },
      {
        "id": "li-229",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 92.8,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-784742",
    "number": "dm_784742",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-230",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 74.6,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-250618",
    "number": "dm_250618",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-231",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 111.9,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-425045",
    "number": "dm_425045",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-232",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 31.1,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-888903",
    "number": "dm_888903",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-233",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 31.1,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-798750",
    "number": "dm_798750",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-234",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 124.4,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-409102",
    "number": "dm_409102",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-235",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 37.3,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-426056",
    "number": "dm_426056",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-236",
        "description": "Filter Replacement - 24x24x2",
        "quantity": 1,
        "unitPrice": 37.3,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-879195",
    "number": "dm_879195",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-237",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 55.95,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-924884",
    "number": "dm_924884",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-238",
        "description": "Filter Replacement - 18x18x2",
        "quantity": 1,
        "unitPrice": 55.95,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-356460",
    "number": "dm_356460",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-239",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 37.25,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-939051",
    "number": "dm_939051",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-240",
        "description": "Filter Replacement - 20x35x2",
        "quantity": 1,
        "unitPrice": 74.5,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-607418",
    "number": "dm_607418",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-241",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 74.5,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-921879",
    "number": "dm_921879",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-525",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Denver, CO"
  },
  {
    "id": "inv-201796",
    "number": "dm_201796",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-526",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Denver, CO"
  },
  {
    "id": "inv-352934",
    "number": "dm_352934",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-535",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-973906",
    "number": "dm_973906",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-536",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-644632",
    "number": "dm_644632",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-11",
    "dueDate": "2026-09-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-537",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-720122",
    "number": "dm_720122",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-09-10",
    "dueDate": "2026-09-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-516",
        "description": "Filter Replacement - 25x25x1",
        "quantity": 1,
        "unitPrice": 25.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-554342",
    "number": "dm_554342",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-363",
        "description": "Filter Replacement - Exterior Filter Service",
        "quantity": 1,
        "unitPrice": 220.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-552246",
    "number": "dm_552246",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-468",
        "description": "Filter Replacement - 14x25x1",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-788338",
    "number": "dm_788338",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-469",
        "description": "Filter Replacement - 16x25x1",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-687547",
    "number": "dm_687547",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-470",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-883998",
    "number": "dm_883998",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-471",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      },
      {
        "id": "li-472",
        "description": "Filter Replacement - 12x25x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-544000",
    "number": "dm_544000",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-473",
        "description": "Filter Replacement - 18x16x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      },
      {
        "id": "li-474",
        "description": "Filter Replacement - 16x20x1",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-277145",
    "number": "dm_277145",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-475",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 140.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-611892",
    "number": "dm_611892",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-476",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-286343",
    "number": "dm_286343",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-477",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      },
      {
        "id": "li-478",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      },
      {
        "id": "li-479",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 105.0,
        "tax": 0
      },
      {
        "id": "li-480",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 752.5,
        "tax": 0
      },
      {
        "id": "li-481",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-501738",
    "number": "dm_501738",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-482",
        "description": "Filter Replacement - 20x25x5",
        "quantity": 1,
        "unitPrice": 75.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-803156",
    "number": "dm_803156",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-483",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-484",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      },
      {
        "id": "li-485",
        "description": "Filter Replacement - 16x25x1",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-892818",
    "number": "dm_892818",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-09-09",
    "dueDate": "2026-09-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-486",
        "description": "Filter Replacement - 14x25x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-154886",
    "number": "dm_154886",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "invoiceDate": "2026-09-08",
    "dueDate": "2026-09-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-531",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-114354",
    "number": "dm_114354",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "invoiceDate": "2026-09-08",
    "dueDate": "2026-09-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-532",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-653470",
    "number": "dm_653470",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-08",
    "dueDate": "2026-09-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-533",
        "description": "Filter Replacement - 16x24x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-615458",
    "number": "dm_615458",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "invoiceDate": "2026-09-08",
    "dueDate": "2026-09-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-534",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Orlando, FL"
  },
  {
    "id": "inv-804837",
    "number": "dm_804837",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-192",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-257048",
    "number": "dm_257048",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-193",
        "description": "Filter Replacement - 1 Unit - 16252x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-367322",
    "number": "dm_367322",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-194",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 27.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-517887",
    "number": "dm_517887",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-195",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 54.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-461079",
    "number": "dm_461079",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-196",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 216.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-969577",
    "number": "dm_969577",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-197",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 27.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-377573",
    "number": "dm_377573",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-198",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 54.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-256749",
    "number": "dm_256749",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-199",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 27.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-255146",
    "number": "dm_255146",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-200",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 54.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-511094",
    "number": "dm_511094",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-201",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 108.0,
        "tax": 0
      },
      {
        "id": "li-202",
        "description": "Filter Replacement - 16x25x1",
        "quantity": 1,
        "unitPrice": 27.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-466117",
    "number": "dm_466117",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-203",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 27.0,
        "tax": 0
      },
      {
        "id": "li-204",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 54.0,
        "tax": 0
      },
      {
        "id": "li-205",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 54.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-335629",
    "number": "dm_335629",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-467",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 27.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-407304",
    "number": "dm_407304",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-09-04",
    "dueDate": "2026-09-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-515",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-555907",
    "number": "dm_555907",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-09-02",
    "dueDate": "2026-09-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-186",
        "description": "Filter Replacement - Unit 1 - 16162",
        "quantity": 1,
        "unitPrice": 42.0,
        "tax": 0
      },
      {
        "id": "li-187",
        "description": "Filter Replacement - Unit 2 - 16162",
        "quantity": 1,
        "unitPrice": 42.0,
        "tax": 0
      },
      {
        "id": "li-188",
        "description": "Filter Replacement - Unit 3 - 18252",
        "quantity": 1,
        "unitPrice": 42.0,
        "tax": 0
      },
      {
        "id": "li-189",
        "description": "Filter Replacement - Unit 4 - 20251",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      },
      {
        "id": "li-190",
        "description": "Filter Replacement - Unit 4 - 20201",
        "quantity": 1,
        "unitPrice": 84.0,
        "tax": 0
      },
      {
        "id": "li-191",
        "description": "Filter Replacement - Unit 5 - 20202",
        "quantity": 1,
        "unitPrice": 157.5,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-788366",
    "number": "dm_788366",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-09-02",
    "dueDate": "2026-09-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-423",
        "description": "Filter Replacement - 20x25x4",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-424",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-201626",
    "number": "dm_201626",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-09-02",
    "dueDate": "2026-09-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-425",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-582062",
    "number": "dm_582062",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-09-02",
    "dueDate": "2026-09-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-426",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-335543",
    "number": "dm_335543",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-09-02",
    "dueDate": "2026-09-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-427",
        "description": "Filter Replacement - 16x24x2",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-254552",
    "number": "dm_254552",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-08-31",
    "dueDate": "2026-09-15",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-185",
        "description": "Filter Replacement - Unit 1 Filter Replacement (16252)",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-668770",
    "number": "dm_668770",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-08-31",
    "dueDate": "2026-09-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-422",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 240.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-549507",
    "number": "dm_549507",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-28",
    "dueDate": "2026-09-12",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-182",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-337977",
    "number": "dm_337977",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-08-28",
    "dueDate": "2026-09-12",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-183",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-923043",
    "number": "dm_923043",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-28",
    "dueDate": "2026-09-12",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-184",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-582082",
    "number": "dm_582082",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-26",
    "dueDate": "2026-09-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-181",
        "description": "Filter Replacement - Filter replacement",
        "quantity": 1,
        "unitPrice": 125.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-453241",
    "number": "dm_453241",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-08-25",
    "dueDate": "2026-09-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-418",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-165723",
    "number": "dm_165723",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-08-25",
    "dueDate": "2026-09-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-419",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-965545",
    "number": "dm_965545",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-08-25",
    "dueDate": "2026-09-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-420",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-297151",
    "number": "dm_297151",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-08-25",
    "dueDate": "2026-09-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-421",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-337630",
    "number": "dm_337630",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-08-25",
    "dueDate": "2026-09-09",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-466",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-149748",
    "number": "dm_149748",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-08-23",
    "dueDate": "2026-09-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-362",
        "description": "Filter Replacement - Internal Filter Service",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-584995",
    "number": "dm_584995",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-154",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 140.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-501751",
    "number": "dm_501751",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-155",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-844648",
    "number": "dm_844648",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-156",
        "description": "Filter Replacement - 16x25x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-178368",
    "number": "dm_178368",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-157",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-324936",
    "number": "dm_324936",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-158",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-736422",
    "number": "dm_736422",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-159",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-258446",
    "number": "dm_258446",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-160",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-966057",
    "number": "dm_966057",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-161",
        "description": "Filter Replacement - 16x20x1",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-162",
        "description": "Filter Replacement - 14x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-335654",
    "number": "dm_335654",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-163",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-560807",
    "number": "dm_560807",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-164",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-711407",
    "number": "dm_711407",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-165",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 69.67,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-682580",
    "number": "dm_682580",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-166",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-980674",
    "number": "dm_980674",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-167",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-776116",
    "number": "dm_776116",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-168",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 65.0,
        "tax": 0
      },
      {
        "id": "li-169",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-623934",
    "number": "dm_623934",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-170",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-320193",
    "number": "dm_320193",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-171",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-121366",
    "number": "dm_121366",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-172",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-776969",
    "number": "dm_776969",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-173",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-819087",
    "number": "dm_819087",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-174",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-591424",
    "number": "dm_591424",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-175",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-502929",
    "number": "dm_502929",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-176",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-501871",
    "number": "dm_501871",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-177",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-245647",
    "number": "dm_245647",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-178",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 110.0,
        "tax": 0
      },
      {
        "id": "li-179",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-700076",
    "number": "dm_700076",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-180",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 110.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-772620",
    "number": "dm_772620",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-08-21",
    "dueDate": "2026-09-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-514",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 480.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-574083",
    "number": "dm_574083",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-08-20",
    "dueDate": "2026-09-04",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-361",
        "description": "Filter Replacement - 3 Exterior Units",
        "quantity": 1,
        "unitPrice": 300.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-179797",
    "number": "dm_179797",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-18",
    "dueDate": "2026-09-02",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-152",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      },
      {
        "id": "li-153",
        "description": "Filter Replacement - Unit 2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-434716",
    "number": "dm_434716",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "invoiceDate": "2026-08-18",
    "dueDate": "2026-09-02",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-463",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-549095",
    "number": "dm_549095",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-08-18",
    "dueDate": "2026-09-02",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-464",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 30.0,
        "tax": 0
      },
      {
        "id": "li-465",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-358786",
    "number": "dm_358786",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-17",
    "dueDate": "2026-09-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-150",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-151",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-173280",
    "number": "dm_173280",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-08-17",
    "dueDate": "2026-09-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-416",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-376865",
    "number": "dm_376865",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-08-17",
    "dueDate": "2026-09-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-417",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-401009",
    "number": "dm_401009",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "invoiceDate": "2026-08-17",
    "dueDate": "2026-09-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-461",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-817517",
    "number": "dm_817517",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "invoiceDate": "2026-08-17",
    "dueDate": "2026-09-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-462",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Atlanta, GA"
  },
  {
    "id": "inv-566775",
    "number": "dm_566775",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-08-15",
    "dueDate": "2026-08-30",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-148",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-321756",
    "number": "dm_321756",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-08-15",
    "dueDate": "2026-08-30",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-149",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-653002",
    "number": "dm_653002",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-14",
    "dueDate": "2026-08-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-147",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-358001",
    "number": "dm_358001",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-08-14",
    "dueDate": "2026-08-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-511",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-248031",
    "number": "dm_248031",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-08-14",
    "dueDate": "2026-08-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-512",
        "description": "Filter Replacement - Unit 2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-425625",
    "number": "dm_425625",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-08-14",
    "dueDate": "2026-08-29",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-513",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-903720",
    "number": "dm_903720",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-13",
    "dueDate": "2026-08-28",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-146",
        "description": "General Service - Welch Coil Cleanings",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-840894",
    "number": "dm_840894",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-08-12",
    "dueDate": "2026-08-27",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-360",
        "description": "Filter Replacement - Filter Service - Rooftop Unit (3)",
        "quantity": 1,
        "unitPrice": 360.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-767437",
    "number": "dm_767437",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-08-12",
    "dueDate": "2026-08-27",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-415",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-742235",
    "number": "dm_742235",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-08-11",
    "dueDate": "2026-08-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-145",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 250.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-523647",
    "number": "dm_523647",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-08-11",
    "dueDate": "2026-08-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-359",
        "description": "Filter Replacement - 30\" Exterior Filter",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-967202",
    "number": "dm_967202",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-08-11",
    "dueDate": "2026-08-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-411",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-522918",
    "number": "dm_522918",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-08-11",
    "dueDate": "2026-08-26",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-412",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      },
      {
        "id": "li-413",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-193031",
    "number": "dm_193031",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-08-11",
    "dueDate": "2026-08-26",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-414",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 135.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-826230",
    "number": "dm_826230",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-131",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 54.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-148860",
    "number": "dm_148860",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-132",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 108.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-235629",
    "number": "dm_235629",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-133",
        "description": "Filter Replacement - 20x30x2",
        "quantity": 1,
        "unitPrice": 672.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-920916",
    "number": "dm_920916",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-134",
        "description": "Filter Replacement - Unit 1 - Filter replacement",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-338026",
    "number": "dm_338026",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-135",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-601701",
    "number": "dm_601701",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-136",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-998948",
    "number": "dm_998948",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-137",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-438245",
    "number": "dm_438245",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-138",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-796202",
    "number": "dm_796202",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-139",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-127889",
    "number": "dm_127889",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-140",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 258.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-985403",
    "number": "dm_985403",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-141",
        "description": "Filter Replacement - Metal Filters Cleaning",
        "quantity": 1,
        "unitPrice": 25.0,
        "tax": 0
      },
      {
        "id": "li-142",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-899413",
    "number": "dm_899413",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-143",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 110.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-839075",
    "number": "dm_839075",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-10",
    "dueDate": "2026-08-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-144",
        "description": "General Service - Condenser Coil Cleanings",
        "quantity": 1,
        "unitPrice": 175.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-562128",
    "number": "dm_562128",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-126",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      },
      {
        "id": "li-127",
        "description": "Filter Replacement - 18x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-325123",
    "number": "dm_325123",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-128",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-129",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-358191",
    "number": "dm_358191",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-130",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 150.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-560097",
    "number": "dm_560097",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-394",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-148924",
    "number": "dm_148924",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-395",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 87.5,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-592870",
    "number": "dm_592870",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-396",
        "description": "Filter Replacement - 20x30x1",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-397",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      },
      {
        "id": "li-398",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      },
      {
        "id": "li-399",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-830106",
    "number": "dm_830106",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-400",
        "description": "Filter Replacement - 16x25x4",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-401",
        "description": "Filter Replacement - 14x25x1",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-402",
        "description": "Filter Replacement - 16x25x1",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-403",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-404",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      },
      {
        "id": "li-405",
        "description": "Filter Replacement - 20x25x4",
        "quantity": 1,
        "unitPrice": 52.5,
        "tax": 0
      },
      {
        "id": "li-406",
        "description": "Filter Replacement - 12x12x1",
        "quantity": 1,
        "unitPrice": 52.5,
        "tax": 0
      },
      {
        "id": "li-407",
        "description": "Filter Replacement - 12x24x1",
        "quantity": 1,
        "unitPrice": 52.5,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-253306",
    "number": "dm_253306",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-08-07",
    "dueDate": "2026-08-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-408",
        "description": "Filter Replacement - 12x24x1",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-409",
        "description": "Filter Replacement - 12x12x1",
        "quantity": 1,
        "unitPrice": 122.5,
        "tax": 0
      },
      {
        "id": "li-410",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 122.5,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-780974",
    "number": "dm_780974",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-08-05",
    "dueDate": "2026-08-20",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-125",
        "description": "Filter Replacement - 25x25x1",
        "quantity": 1,
        "unitPrice": 25.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-487641",
    "number": "dm_487641",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-08-04",
    "dueDate": "2026-08-19",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-124",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-236875",
    "number": "dm_236875",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-08-03",
    "dueDate": "2026-08-18",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-77",
        "description": "Filter Replacement - Mega Saver - 5101 South 24th Street, Omaha",
        "quantity": 1,
        "unitPrice": 19.64,
        "tax": 0
      },
      {
        "id": "li-78",
        "description": "Filter Replacement - Mega Saver - 4108 Dodge Street, Omaha",
        "quantity": 1,
        "unitPrice": 39.28,
        "tax": 0
      },
      {
        "id": "li-79",
        "description": "Filter Replacement - Mega Saver - 42nd St Auto Service Center",
        "quantity": 1,
        "unitPrice": 39.28,
        "tax": 0
      },
      {
        "id": "li-80",
        "description": "Filter Replacement - Mega Saver - Richland Drive",
        "quantity": 1,
        "unitPrice": 19.64,
        "tax": 0
      },
      {
        "id": "li-81",
        "description": "Filter Replacement - Mega Saver - 6000 Grover Street, Omaha",
        "quantity": 1,
        "unitPrice": 58.92,
        "tax": 0
      },
      {
        "id": "li-82",
        "description": "Filter Replacement - Mega Saver - 5444 Center Street, Omaha",
        "quantity": 1,
        "unitPrice": 58.92,
        "tax": 0
      },
      {
        "id": "li-83",
        "description": "Filter Replacement - Mega Saver - 1910 North 144th Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-84",
        "description": "Filter Replacement - Mega Saver - 10780 Q Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-85",
        "description": "Filter Replacement - Mega Saver - 10707 Blondo Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-86",
        "description": "Filter Replacement - Mega Saver - 7204 Blondo Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-87",
        "description": "Filter Replacement - Mega Saver - 4725 South 77th Avenue, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-88",
        "description": "Filter Replacement - Mega Saver - 4429 California Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-89",
        "description": "Filter Replacement - Mega Saver - 4420 South 24th Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-90",
        "description": "Filter Replacement - Mega Saver - 3402 South 42nd Street, Omaha",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-91",
        "description": "Filter Replacement - Mega Saver - 1749 West Broadway, CB",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-92",
        "description": "Filter Replacement - Mega Saver - 12701 South 28th Avenue, Capehart Road, Bellevue",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-93",
        "description": "Filter Replacement - Mega Saver - 7205 Lawndale Drive, Omaha",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-94",
        "description": "Filter Replacement - Mega Saver - 3607 9th Avenue, CB",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-95",
        "description": "Filter Replacement - Mega Saver - 1305 North 25th Street, CB",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-96",
        "description": "Filter Replacement - Mega Saver - 6912 South 110th Street, La Vista",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-97",
        "description": "Filter Replacement - Mega Saver - 3223 North 108th Street, Omaha",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-98",
        "description": "Filter Replacement - Mega Saver - 7210 Harrison Street, La Vista",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-99",
        "description": "Filter Replacement - Mega Saver - 2024 5th Ave",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-100",
        "description": "Filter Replacement - Mega Saver - 12005 Pacific Street, Omaha",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      },
      {
        "id": "li-101",
        "description": "Filter Replacement - Mega Saver - 8242 Maple Street, Omaha",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      },
      {
        "id": "li-102",
        "description": "Filter Replacement - Mega Saver - 4015 South 42nd Steet, Omaha",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      },
      {
        "id": "li-103",
        "description": "Filter Replacement - Mega Saver - 3540 West Broadway, CB",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      },
      {
        "id": "li-104",
        "description": "Filter Replacement - Mega Saver - 2505 Abbott Plaza , Omaha",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      },
      {
        "id": "li-105",
        "description": "Filter Replacement - Mega Saver - 2014 L Street, Omaha",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      },
      {
        "id": "li-106",
        "description": "Filter Replacement - Mega Saver - 14111 Platteview Road, Springfield",
        "quantity": 1,
        "unitPrice": 58.92,
        "tax": 0
      },
      {
        "id": "li-107",
        "description": "Filter Replacement - Mega Saver - 8928 Maple Street, Omaha",
        "quantity": 1,
        "unitPrice": 176.76,
        "tax": 0
      },
      {
        "id": "li-108",
        "description": "Filter Replacement - Mega Saver - 10025 South 168th Avenue, Omaha",
        "quantity": 1,
        "unitPrice": 176.76,
        "tax": 0
      },
      {
        "id": "li-109",
        "description": "Filter Replacement - Mega Saver - 5301 North 90th Street, Omaha",
        "quantity": 1,
        "unitPrice": 176.76,
        "tax": 0
      },
      {
        "id": "li-110",
        "description": "Filter Replacement - Mega Saver - Corporate Office",
        "quantity": 1,
        "unitPrice": 176.76,
        "tax": 0
      },
      {
        "id": "li-111",
        "description": "Filter Replacement - Mega Saver - 6508 John J Pershing Drive, Omaha",
        "quantity": 1,
        "unitPrice": 196.4,
        "tax": 0
      },
      {
        "id": "li-112",
        "description": "Filter Replacement - Mega Saver - 5700 Lincoln",
        "quantity": 1,
        "unitPrice": 196.4,
        "tax": 0
      },
      {
        "id": "li-113",
        "description": "Filter Replacement - Mega Saver - 1357 NW Radial Highway, Omaha",
        "quantity": 1,
        "unitPrice": 196.4,
        "tax": 0
      },
      {
        "id": "li-114",
        "description": "Filter Replacement - Mega Saver - 712 US-6, Gretna",
        "quantity": 1,
        "unitPrice": 78.56,
        "tax": 0
      },
      {
        "id": "li-115",
        "description": "Filter Replacement - Mega Saver - 2627 HWS Cleveland Boulevard, Omaha",
        "quantity": 1,
        "unitPrice": 235.68,
        "tax": 0
      },
      {
        "id": "li-116",
        "description": "Filter Replacement - Mega Saver - 16808 Audrey Street, Omaha",
        "quantity": 1,
        "unitPrice": 235.68,
        "tax": 0
      },
      {
        "id": "li-117",
        "description": "Filter Replacement - Mega Saver - 7059 Dodge Steet, Suite 101, Omaha",
        "quantity": 1,
        "unitPrice": 235.68,
        "tax": 0
      },
      {
        "id": "li-118",
        "description": "Filter Replacement - Mega Saver - 11511 South 36th Street, Bellevue",
        "quantity": 1,
        "unitPrice": 255.32,
        "tax": 0
      },
      {
        "id": "li-119",
        "description": "Filter Replacement - Mega Saver - 14353 Q Street, Omaha",
        "quantity": 1,
        "unitPrice": 274.96,
        "tax": 0
      },
      {
        "id": "li-120",
        "description": "Filter Replacement - Mega Saver - 8727 Maple Street, Omaha",
        "quantity": 1,
        "unitPrice": 274.96,
        "tax": 0
      },
      {
        "id": "li-121",
        "description": "Filter Replacement - Mega Saver - 8540 Blondo Street, Omaha",
        "quantity": 1,
        "unitPrice": 274.96,
        "tax": 0
      },
      {
        "id": "li-122",
        "description": "Filter Replacement - Mega Saver - 9516 Calhoun Road, Omaha",
        "quantity": 1,
        "unitPrice": 353.52,
        "tax": 0
      },
      {
        "id": "li-123",
        "description": "Filter Replacement - Mega Saver - 8409 West Center Road, Omaha",
        "quantity": 1,
        "unitPrice": 392.8,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-977079",
    "number": "dm_977079",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "invoiceDate": "2026-08-03",
    "dueDate": "2026-08-18",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-508",
        "description": "Filter Replacement - Mega Saver - Richland Drive",
        "quantity": 1,
        "unitPrice": 39.28,
        "tax": 0
      },
      {
        "id": "li-509",
        "description": "Filter Replacement - Mega Saver - 14111 Platteview Road, Springfield",
        "quantity": 1,
        "unitPrice": 117.84,
        "tax": 0
      },
      {
        "id": "li-510",
        "description": "Filter Replacement - Mega Saver - 712 US-6, Gretna",
        "quantity": 1,
        "unitPrice": 157.12,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Tampa, FL"
  },
  {
    "id": "inv-176519",
    "number": "dm_176519",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-31",
    "dueDate": "2026-08-15",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-76",
        "description": "Filter Replacement - 14x25x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-953512",
    "number": "dm_953512",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-07-30",
    "dueDate": "2026-08-14",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-74",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 30.0,
        "tax": 0
      },
      {
        "id": "li-75",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 180.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-135831",
    "number": "dm_135831",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-29",
    "dueDate": "2026-08-13",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-69",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-155814",
    "number": "dm_155814",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-29",
    "dueDate": "2026-08-13",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-70",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      },
      {
        "id": "li-71",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-140986",
    "number": "dm_140986",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-29",
    "dueDate": "2026-08-13",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-72",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-502444",
    "number": "dm_502444",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-07-29",
    "dueDate": "2026-08-13",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-73",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 310.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-602102",
    "number": "dm_602102",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-07-28",
    "dueDate": "2026-08-12",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-392",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-874900",
    "number": "dm_874900",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-07-28",
    "dueDate": "2026-08-12",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-393",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-423640",
    "number": "dm_423640",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-27",
    "dueDate": "2026-08-11",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-68",
        "description": "Filter Replacement - Unit 1 - All filters",
        "quantity": 1,
        "unitPrice": 110.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-414355",
    "number": "dm_414355",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-07-27",
    "dueDate": "2026-08-11",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-391",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-799935",
    "number": "dm_799935",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-24",
    "dueDate": "2026-08-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-62",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-238154",
    "number": "dm_238154",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-24",
    "dueDate": "2026-08-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-63",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-815009",
    "number": "dm_815009",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-24",
    "dueDate": "2026-08-08",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-64",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-397204",
    "number": "dm_397204",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-07-24",
    "dueDate": "2026-08-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-65",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-377088",
    "number": "dm_377088",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-07-24",
    "dueDate": "2026-08-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-66",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-200979",
    "number": "dm_200979",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-24",
    "dueDate": "2026-08-08",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-67",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-326372",
    "number": "dm_326372",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-23",
    "dueDate": "2026-08-07",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-61",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-542625",
    "number": "dm_542625",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-07-22",
    "dueDate": "2026-08-06",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-60",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-740858",
    "number": "dm_740858",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-53",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-750208",
    "number": "dm_750208",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-54",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-593444",
    "number": "dm_593444",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-55",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 65.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-729213",
    "number": "dm_729213",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-56",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-737934",
    "number": "dm_737934",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-57",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-704543",
    "number": "dm_704543",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-58",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-881350",
    "number": "dm_881350",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-17",
    "dueDate": "2026-08-01",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-59",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-608315",
    "number": "dm_608315",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-16",
    "dueDate": "2026-07-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-577",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-943458",
    "number": "dm_943458",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-16",
    "dueDate": "2026-07-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-578",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": 0.09,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-724342",
    "number": "dm_724342",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-16",
    "dueDate": "2026-07-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-579",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-690608",
    "number": "dm_690608",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-16",
    "dueDate": "2026-07-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-580",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": -0.09,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-920243",
    "number": "dm_920243",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-16",
    "dueDate": "2026-07-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-581",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-172635",
    "number": "dm_172635",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-16",
    "dueDate": "2026-07-31",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-582",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": -0.19,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-558292",
    "number": "dm_558292",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-15",
    "dueDate": "2026-07-30",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-52",
        "description": "Filter Replacement - Commercial Air Filter Replacement",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-758564",
    "number": "dm_758564",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-15",
    "dueDate": "2026-07-30",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-575",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-996564",
    "number": "dm_996564",
    "franchiseId": "fr-12",
    "companyId": "co-12-1",
    "invoiceDate": "2026-07-15",
    "dueDate": "2026-07-30",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-576",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": -0.09,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Las Vegas, NV"
  },
  {
    "id": "inv-981152",
    "number": "dm_981152",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-14",
    "dueDate": "2026-07-29",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-51",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-924926",
    "number": "dm_924926",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-43",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-361597",
    "number": "dm_361597",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-44",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 25.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-830664",
    "number": "dm_830664",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-45",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-263463",
    "number": "dm_263463",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-46",
        "description": "Filter Replacement - 20x35x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-308749",
    "number": "dm_308749",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-47",
        "description": "Filter Replacement - 18x18x2",
        "quantity": 1,
        "unitPrice": 50.25,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-376627",
    "number": "dm_376627",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-48",
        "description": "Filter Replacement - 16x24x2",
        "quantity": 1,
        "unitPrice": 50.25,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-389728",
    "number": "dm_389728",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-49",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 83.75,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-702337",
    "number": "dm_702337",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-50",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 29.3,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-647586",
    "number": "dm_647586",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-07-10",
    "dueDate": "2026-07-25",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-389",
        "description": "Filter Replacement - 16x25x1",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-390",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-167409",
    "number": "dm_167409",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-07-09",
    "dueDate": "2026-07-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-42",
        "description": "Filter Replacement - Per Unit",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-770978",
    "number": "dm_770978",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "invoiceDate": "2026-07-09",
    "dueDate": "2026-07-24",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-357",
        "description": "Filter Replacement - 12\" Interior Filter",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      },
      {
        "id": "li-358",
        "description": "Filter Replacement - 20\" Interior Filter",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-237024",
    "number": "dm_237024",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-08",
    "dueDate": "2026-07-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-38",
        "description": "Filter Replacement - Drywall and Duct Work",
        "quantity": 1,
        "unitPrice": 295.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-560494",
    "number": "dm_560494",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-08",
    "dueDate": "2026-07-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-39",
        "description": "Filter Replacement - 14x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-40",
        "description": "Filter Replacement - 15x20x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-642585",
    "number": "dm_642585",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-08",
    "dueDate": "2026-07-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-41",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-159977",
    "number": "dm_159977",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-07-08",
    "dueDate": "2026-07-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-355",
        "description": "Filter Replacement - 25\" Exterior Filters",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-965519",
    "number": "dm_965519",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-07-08",
    "dueDate": "2026-07-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-356",
        "description": "Filter Replacement - 20\" Exterior Filter",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-664721",
    "number": "dm_664721",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "invoiceDate": "2026-07-08",
    "dueDate": "2026-07-23",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-388",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 240.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-913205",
    "number": "dm_913205",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-07-07",
    "dueDate": "2026-07-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-386",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-519692",
    "number": "dm_519692",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-07-07",
    "dueDate": "2026-07-22",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-387",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-699288",
    "number": "dm_699288",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-06",
    "dueDate": "2026-07-21",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-35",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 56.0,
        "tax": 0
      },
      {
        "id": "li-36",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 112.0,
        "tax": 0
      },
      {
        "id": "li-37",
        "description": "Filter Replacement - 20x24x2",
        "quantity": 1,
        "unitPrice": 112.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-743336",
    "number": "dm_743336",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-07-06",
    "dueDate": "2026-07-21",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-353",
        "description": "Filter Replacement - Interior Filter Replacement",
        "quantity": 1,
        "unitPrice": 35.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-304299",
    "number": "dm_304299",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-07-06",
    "dueDate": "2026-07-21",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-354",
        "description": "Filter Replacement - Interior Filter Replacement",
        "quantity": 1,
        "unitPrice": 17.5,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-595750",
    "number": "dm_595750",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-21",
        "description": "Filter Replacement - Unit 2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-717827",
    "number": "dm_717827",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-22",
        "description": "Filter Replacement - Unit 3",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-177415",
    "number": "dm_177415",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-23",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-232006",
    "number": "dm_232006",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-24",
        "description": "Filter Replacement - Unit 2",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-229878",
    "number": "dm_229878",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-25",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 115.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-929465",
    "number": "dm_929465",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-26",
        "description": "Filter Replacement - Unit 3",
        "quantity": 1,
        "unitPrice": 115.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-873047",
    "number": "dm_873047",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-27",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": -62.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-849822",
    "number": "dm_849822",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-28",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 170.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-414380",
    "number": "dm_414380",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-29",
        "description": "Filter Replacement - Metal Filters Cleaning and Coil Cleaning",
        "quantity": 1,
        "unitPrice": 27.5,
        "tax": 0
      },
      {
        "id": "li-30",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 220.0,
        "tax": 0
      },
      {
        "id": "li-31",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": -37.12,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-347203",
    "number": "dm_347203",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-32",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-33",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 70.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-756517",
    "number": "dm_756517",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-02",
    "dueDate": "2026-07-17",
    "paidStatus": "paid",
    "status": "unprocessed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-34",
        "description": "Discount",
        "quantity": 1,
        "unitPrice": -0.33,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-740550",
    "number": "dm_740550",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-2",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 150.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-470279",
    "number": "dm_470279",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-3",
        "description": "Filter Replacement - Unit 2",
        "quantity": 1,
        "unitPrice": 150.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-780225",
    "number": "dm_780225",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-4",
        "description": "Filter Replacement - Unit 3",
        "quantity": 1,
        "unitPrice": 150.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-484456",
    "number": "dm_484456",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-5",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-736427",
    "number": "dm_736427",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-6",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-107714",
    "number": "dm_107714",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-7",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-758948",
    "number": "dm_758948",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-8",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-252562",
    "number": "dm_252562",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-9",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-456689",
    "number": "dm_456689",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-10",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-891834",
    "number": "dm_891834",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-11",
        "description": "Filter Replacement - 20x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-879047",
    "number": "dm_879047",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-12",
        "description": "Filter Replacement - 18x24x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-377195",
    "number": "dm_377195",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-13",
        "description": "Filter Replacement - 16x24x2",
        "quantity": 1,
        "unitPrice": 90.0,
        "tax": 0
      },
      {
        "id": "li-14",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 20.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-856798",
    "number": "dm_856798",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-15",
        "description": "Filter Replacement - 18x25x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-729743",
    "number": "dm_729743",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-16",
        "description": "Filter Replacement - 20x25x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-216211",
    "number": "dm_216211",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-17",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-352075",
    "number": "dm_352075",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-18",
        "description": "Filter Replacement - 20x20x2",
        "quantity": 1,
        "unitPrice": 150.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-371656",
    "number": "dm_371656",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-19",
        "description": "Filter Replacement - Unit 1",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-954718",
    "number": "dm_954718",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "invoiceDate": "2026-07-01",
    "dueDate": "2026-07-16",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-20",
        "description": "Filter Replacement - Unit 2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-715220",
    "number": "dm_715220",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-06-30",
    "dueDate": "2026-07-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-352",
        "description": "Filter Replacement - 25\" Exterior Filters",
        "quantity": 1,
        "unitPrice": 80.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-940171",
    "number": "dm_940171",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-06-30",
    "dueDate": "2026-07-15",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-385",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 50.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-681704",
    "number": "dm_681704",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-1",
        "description": "Filter Replacement - Service ~ De-cottoning",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 25,
    "feePct": 0,
    "territory": "Dallas–Fort Worth, TX"
  },
  {
    "id": "inv-566885",
    "number": "dm_566885",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-351",
        "description": "Filter Replacement - 18x20x2",
        "quantity": 1,
        "unitPrice": 100.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-472258",
    "number": "dm_472258",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-380",
        "description": "Filter Replacement - 20x30x1",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-661584",
    "number": "dm_661584",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-381",
        "description": "Filter Replacement - 16x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-588597",
    "number": "dm_588597",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-382",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-793401",
    "number": "dm_793401",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-383",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-809351",
    "number": "dm_809351",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "invoiceDate": "2026-06-25",
    "dueDate": "2026-07-10",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-384",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 120.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-911111",
    "number": "dm_911111",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "invoiceDate": "2026-06-20",
    "dueDate": "2026-07-05",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-379",
        "description": "Filter Replacement - 14x20x2",
        "quantity": 1,
        "unitPrice": 200.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-756354",
    "number": "dm_756354",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "invoiceDate": "2026-06-19",
    "dueDate": "2026-07-04",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-348",
        "description": "Filter Replacement - 16x24x2",
        "quantity": 1,
        "unitPrice": 40.0,
        "tax": 0
      },
      {
        "id": "li-349",
        "description": "Filter Replacement - 20x20x1",
        "quantity": 1,
        "unitPrice": 160.0,
        "tax": 0
      },
      {
        "id": "li-350",
        "description": "Filter Replacement - 16x16x2",
        "quantity": 1,
        "unitPrice": 240.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Houston, TX"
  },
  {
    "id": "inv-718604",
    "number": "dm_718604",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "invoiceDate": "2026-06-18",
    "dueDate": "2026-07-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-377",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  },
  {
    "id": "inv-134359",
    "number": "dm_134359",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "invoiceDate": "2026-06-18",
    "dueDate": "2026-07-03",
    "paidStatus": "paid",
    "status": "processed",
    "source": "QuickBooks",
    "lineItems": [
      {
        "id": "li-378",
        "description": "Filter Replacement - 16x25x2",
        "quantity": 1,
        "unitPrice": 60.0,
        "tax": 0
      }
    ],
    "royaltyPct": 15,
    "feePct": 0,
    "territory": "Phoenix, AZ"
  }
];

export const reportBills: Bill[] = [
  {
    "id": "BILL-0200",
    "invoiceId": "inv-837721",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-17",
    "billDate": "2026-11-11"
  },
  {
    "id": "BILL-0212",
    "invoiceId": "inv-981621",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-10-15",
    "billDate": "2026-11-11"
  },
  {
    "id": "BILL-0213",
    "invoiceId": "inv-698987",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-11-05",
    "billDate": "2026-11-11"
  },
  {
    "id": "BILL-0214",
    "invoiceId": "inv-924793",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 125.37,
    "royalty": 22.13,
    "fees": 0,
    "gross": 147.5,
    "status": "synced",
    "invoiceDate": "2026-11-05",
    "billDate": "2026-11-11"
  },
  {
    "id": "BILL-0245",
    "invoiceId": "inv-667102",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 144.5,
    "royalty": 25.5,
    "fees": 0,
    "gross": 170.0,
    "status": "synced",
    "invoiceDate": "2026-10-23",
    "billDate": "2026-11-11"
  },
  {
    "id": "BILL-0246",
    "invoiceId": "inv-807222",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 127.5,
    "royalty": 22.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-11-09",
    "billDate": "2026-11-11"
  },
  {
    "id": "BILL-0151",
    "invoiceId": "inv-965519",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-08",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0163",
    "invoiceId": "inv-397753",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 353.6,
    "royalty": 62.4,
    "fees": 0,
    "gross": 416.0,
    "status": "synced",
    "invoiceDate": "2026-10-29",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0224",
    "invoiceId": "inv-883998",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0225",
    "invoiceId": "inv-544000",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0227",
    "invoiceId": "inv-611892",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "amount": 59.5,
    "royalty": 10.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0232",
    "invoiceId": "inv-735837",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "amount": 255.0,
    "royalty": 45.0,
    "fees": 0,
    "gross": 300.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0233",
    "invoiceId": "inv-381889",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0234",
    "invoiceId": "inv-920869",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-09-26",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0235",
    "invoiceId": "inv-621349",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 270.3,
    "royalty": 47.7,
    "fees": 0,
    "gross": 318.0,
    "status": "synced",
    "invoiceDate": "2026-10-02",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0236",
    "invoiceId": "inv-913177",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 510.0,
    "royalty": 90.0,
    "fees": 0,
    "gross": 600.0,
    "status": "synced",
    "invoiceDate": "2026-10-13",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0254",
    "invoiceId": "inv-771825",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "amount": 153.0,
    "royalty": 27.0,
    "fees": 0,
    "gross": 180.0,
    "status": "synced",
    "invoiceDate": "2026-10-05",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0280",
    "invoiceId": "inv-889355",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-10-19",
    "billDate": "2026-11-04"
  },
  {
    "id": "BILL-0210",
    "invoiceId": "inv-654522",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-10-09",
    "billDate": "2026-10-28"
  },
  {
    "id": "BILL-0211",
    "invoiceId": "inv-154780",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-10-09",
    "billDate": "2026-10-28"
  },
  {
    "id": "BILL-0218",
    "invoiceId": "inv-549095",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 127.5,
    "royalty": 22.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-08-18",
    "billDate": "2026-10-28"
  },
  {
    "id": "BILL-0279",
    "invoiceId": "inv-245360",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-10-14",
    "billDate": "2026-10-28"
  },
  {
    "id": "BILL-0281",
    "invoiceId": "inv-770784",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 202.5,
    "royalty": 67.5,
    "fees": 0,
    "gross": 270.0,
    "status": "synced",
    "invoiceDate": "2026-10-23",
    "billDate": "2026-10-28"
  },
  {
    "id": "BILL-0286",
    "invoiceId": "inv-811553",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-10-08",
    "billDate": "2026-10-28"
  },
  {
    "id": "BILL-0021",
    "invoiceId": "inv-717827",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 30.0,
    "royalty": 10.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0046",
    "invoiceId": "inv-542625",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-22",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0062",
    "invoiceId": "inv-358191",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 112.5,
    "royalty": 37.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0084",
    "invoiceId": "inv-324936",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0088",
    "invoiceId": "inv-335654",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0092",
    "invoiceId": "inv-776116",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 183.75,
    "royalty": 61.25,
    "fees": 0,
    "gross": 245.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0093",
    "invoiceId": "inv-623934",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0098",
    "invoiceId": "inv-591424",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0100",
    "invoiceId": "inv-501871",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0103",
    "invoiceId": "inv-549507",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-28",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0116",
    "invoiceId": "inv-466117",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 101.25,
    "royalty": 33.75,
    "fees": 0,
    "gross": 135.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0117",
    "invoiceId": "inv-679610",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0118",
    "invoiceId": "inv-821477",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0125",
    "invoiceId": "inv-723389",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 135.0,
    "royalty": 45.0,
    "fees": 0,
    "gross": 180.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0127",
    "invoiceId": "inv-666804",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0131",
    "invoiceId": "inv-899908",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0136",
    "invoiceId": "inv-279144",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 337.5,
    "royalty": 112.5,
    "fees": 0,
    "gross": 450.0,
    "status": "synced",
    "invoiceDate": "2026-10-02",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0137",
    "invoiceId": "inv-453832",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-10-02",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0138",
    "invoiceId": "inv-708071",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-10-07",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0139",
    "invoiceId": "inv-227460",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 338.63,
    "royalty": 112.88,
    "fees": 0,
    "gross": 451.51,
    "status": "synced",
    "invoiceDate": "2026-10-07",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0140",
    "invoiceId": "inv-958471",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-10-09",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0141",
    "invoiceId": "inv-389465",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-10-09",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0142",
    "invoiceId": "inv-637475",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 300.0,
    "royalty": 100.0,
    "fees": 0,
    "gross": 400.0,
    "status": "synced",
    "invoiceDate": "2026-10-09",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0143",
    "invoiceId": "inv-849237",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-10-09",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0144",
    "invoiceId": "inv-423498",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 180.0,
    "royalty": 60.0,
    "fees": 0,
    "gross": 240.0,
    "status": "synced",
    "invoiceDate": "2026-10-12",
    "billDate": "2026-10-23"
  },
  {
    "id": "BILL-0038",
    "invoiceId": "inv-558292",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-15",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0040",
    "invoiceId": "inv-750208",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0082",
    "invoiceId": "inv-844648",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0096",
    "invoiceId": "inv-776969",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0149",
    "invoiceId": "inv-304299",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 14.88,
    "royalty": 2.63,
    "fees": 0,
    "gross": 17.51,
    "status": "synced",
    "invoiceDate": "2026-07-06",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0150",
    "invoiceId": "inv-159977",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 136.0,
    "royalty": 24.0,
    "fees": 0,
    "gross": 160.0,
    "status": "synced",
    "invoiceDate": "2026-07-08",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0162",
    "invoiceId": "inv-611737",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 99.88,
    "royalty": 17.63,
    "fees": 0,
    "gross": 117.51,
    "status": "synced",
    "invoiceDate": "2026-10-01",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0248",
    "invoiceId": "inv-408888",
    "franchiseId": "fr-07",
    "companyId": "co-07-1",
    "amount": 25.5,
    "royalty": 4.5,
    "fees": 0,
    "gross": 30.0,
    "status": "synced",
    "invoiceDate": "2026-09-23",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0275",
    "invoiceId": "inv-732509",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-10-05",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0276",
    "invoiceId": "inv-448110",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-10-06",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0278",
    "invoiceId": "inv-982607",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 180.0,
    "royalty": 60.0,
    "fees": 0,
    "gross": 240.0,
    "status": "synced",
    "invoiceDate": "2026-10-12",
    "billDate": "2026-10-21"
  },
  {
    "id": "BILL-0221",
    "invoiceId": "inv-552246",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0222",
    "invoiceId": "inv-788338",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0223",
    "invoiceId": "inv-687547",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 17.0,
    "royalty": 3.0,
    "fees": 0,
    "gross": 20.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0226",
    "invoiceId": "inv-277145",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 119.0,
    "royalty": 21.0,
    "fees": 0,
    "gross": 140.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0228",
    "invoiceId": "inv-286343",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 907.38,
    "royalty": 160.12,
    "fees": 0,
    "gross": 1067.5,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0229",
    "invoiceId": "inv-803156",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 133.88,
    "royalty": 23.62,
    "fees": 0,
    "gross": 157.5,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0230",
    "invoiceId": "inv-892818",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0231",
    "invoiceId": "inv-897317",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-16"
  },
  {
    "id": "BILL-0206",
    "invoiceId": "inv-925638",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-24",
    "billDate": "2026-10-15"
  },
  {
    "id": "BILL-0209",
    "invoiceId": "inv-165045",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-10-01",
    "billDate": "2026-10-15"
  },
  {
    "id": "BILL-0161",
    "invoiceId": "inv-118640",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 114.75,
    "royalty": 20.25,
    "fees": 0,
    "gross": 135.0,
    "status": "synced",
    "invoiceDate": "2026-10-01",
    "billDate": "2026-10-13"
  },
  {
    "id": "BILL-0199",
    "invoiceId": "inv-352343",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-17",
    "billDate": "2026-10-12"
  },
  {
    "id": "BILL-0017",
    "invoiceId": "inv-352075",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 112.5,
    "royalty": 37.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0030",
    "invoiceId": "inv-642585",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-08",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0043",
    "invoiceId": "inv-737934",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 52.5,
    "royalty": 17.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0044",
    "invoiceId": "inv-704543",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0049",
    "invoiceId": "inv-238154",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 52.5,
    "royalty": 17.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-07-24",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0051",
    "invoiceId": "inv-377088",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-07-24",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0053",
    "invoiceId": "inv-423640",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 82.5,
    "royalty": 27.5,
    "fees": 0,
    "gross": 110.0,
    "status": "synced",
    "invoiceDate": "2026-07-27",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0064",
    "invoiceId": "inv-920916",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0065",
    "invoiceId": "inv-338026",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0067",
    "invoiceId": "inv-998948",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0076",
    "invoiceId": "inv-566775",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-08-15",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0087",
    "invoiceId": "inv-966057",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0094",
    "invoiceId": "inv-320193",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0095",
    "invoiceId": "inv-121366",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0097",
    "invoiceId": "inv-819087",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0107",
    "invoiceId": "inv-804837",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0120",
    "invoiceId": "inv-889575",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 139.88,
    "royalty": 46.63,
    "fees": 0,
    "gross": 186.51,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0121",
    "invoiceId": "inv-511911",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 139.88,
    "royalty": 46.63,
    "fees": 0,
    "gross": 186.51,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0122",
    "invoiceId": "inv-945078",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 139.5,
    "royalty": 46.5,
    "fees": 0,
    "gross": 186.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0126",
    "invoiceId": "inv-906382",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0129",
    "invoiceId": "inv-171539",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 56.25,
    "royalty": 18.75,
    "fees": 0,
    "gross": 75.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0132",
    "invoiceId": "inv-244005",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 191.25,
    "royalty": 63.75,
    "fees": 0,
    "gross": 255.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0133",
    "invoiceId": "inv-925651",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 131.24,
    "royalty": 43.75,
    "fees": 0,
    "gross": 174.99,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0134",
    "invoiceId": "inv-813385",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 193.5,
    "royalty": 64.5,
    "fees": 0,
    "gross": 258.0,
    "status": "synced",
    "invoiceDate": "2026-09-28",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0135",
    "invoiceId": "inv-178968",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-10-02",
    "billDate": "2026-10-09"
  },
  {
    "id": "BILL-0274",
    "invoiceId": "inv-769513",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-30",
    "billDate": "2026-10-08"
  },
  {
    "id": "BILL-0277",
    "invoiceId": "inv-851635",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 360.0,
    "royalty": 120.0,
    "fees": 0,
    "gross": 480.0,
    "status": "synced",
    "invoiceDate": "2026-10-08",
    "billDate": "2026-10-08"
  },
  {
    "id": "BILL-0285",
    "invoiceId": "inv-450077",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-10-06",
    "billDate": "2026-10-08"
  },
  {
    "id": "BILL-0160",
    "invoiceId": "inv-707791",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 93.5,
    "royalty": 16.5,
    "fees": 0,
    "gross": 110.0,
    "status": "synced",
    "invoiceDate": "2026-09-23",
    "billDate": "2026-10-07"
  },
  {
    "id": "BILL-0270",
    "invoiceId": "inv-903530",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-06"
  },
  {
    "id": "BILL-0271",
    "invoiceId": "inv-906401",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 240.04,
    "royalty": 80.0,
    "fees": 0,
    "gross": 320.04,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-10-06"
  },
  {
    "id": "BILL-0196",
    "invoiceId": "inv-582062",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-02",
    "billDate": "2026-10-05"
  },
  {
    "id": "BILL-0208",
    "invoiceId": "inv-704915",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-30",
    "billDate": "2026-10-05"
  },
  {
    "id": "BILL-0244",
    "invoiceId": "inv-321766",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 106.25,
    "royalty": 18.75,
    "fees": 0,
    "gross": 125.0,
    "status": "synced",
    "invoiceDate": "2026-09-21",
    "billDate": "2026-10-02"
  },
  {
    "id": "BILL-0190",
    "invoiceId": "inv-165723",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-25",
    "billDate": "2026-10-01"
  },
  {
    "id": "BILL-0207",
    "invoiceId": "inv-491568",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-30",
    "billDate": "2026-10-01"
  },
  {
    "id": "BILL-0267",
    "invoiceId": "inv-179819",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-22",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0268",
    "invoiceId": "inv-492643",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-22",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0269",
    "invoiceId": "inv-888492",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-24",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0272",
    "invoiceId": "inv-821867",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-29",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0273",
    "invoiceId": "inv-339819",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-30",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0282",
    "invoiceId": "inv-625071",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-23",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0283",
    "invoiceId": "inv-579660",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-09-23",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0284",
    "invoiceId": "inv-947636",
    "franchiseId": "fr-10",
    "companyId": "co-10-1",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-23",
    "billDate": "2026-09-30"
  },
  {
    "id": "BILL-0016",
    "invoiceId": "inv-216211",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0019",
    "invoiceId": "inv-954718",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0022",
    "invoiceId": "inv-177415",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0023",
    "invoiceId": "inv-232006",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0026",
    "invoiceId": "inv-347203",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 82.5,
    "royalty": 27.5,
    "fees": 0,
    "gross": 110.0,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0028",
    "invoiceId": "inv-237024",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 221.25,
    "royalty": 73.75,
    "fees": 0,
    "gross": 295.0,
    "status": "synced",
    "invoiceDate": "2026-07-08",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0034",
    "invoiceId": "inv-830664",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-07-10",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0035",
    "invoiceId": "inv-263463",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 52.5,
    "royalty": 17.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-07-10",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0042",
    "invoiceId": "inv-729213",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 52.5,
    "royalty": 17.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0054",
    "invoiceId": "inv-135831",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-29",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0056",
    "invoiceId": "inv-502444",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 232.5,
    "royalty": 77.5,
    "fees": 0,
    "gross": 310.0,
    "status": "synced",
    "invoiceDate": "2026-07-29",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0057",
    "invoiceId": "inv-953512",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 157.5,
    "royalty": 52.5,
    "fees": 0,
    "gross": 210.0,
    "status": "synced",
    "invoiceDate": "2026-07-30",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0059",
    "invoiceId": "inv-487641",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0060",
    "invoiceId": "inv-562128",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0078",
    "invoiceId": "inv-358786",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-17",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0081",
    "invoiceId": "inv-501751",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0083",
    "invoiceId": "inv-178368",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0085",
    "invoiceId": "inv-736422",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0090",
    "invoiceId": "inv-682580",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0105",
    "invoiceId": "inv-923043",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-08-28",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0108",
    "invoiceId": "inv-367322",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 20.25,
    "royalty": 6.75,
    "fees": 0,
    "gross": 27.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0110",
    "invoiceId": "inv-461079",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 162.0,
    "royalty": 54.0,
    "fees": 0,
    "gross": 216.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0111",
    "invoiceId": "inv-969577",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 20.25,
    "royalty": 6.75,
    "fees": 0,
    "gross": 27.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0112",
    "invoiceId": "inv-377573",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 40.5,
    "royalty": 13.5,
    "fees": 0,
    "gross": 54.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0113",
    "invoiceId": "inv-256749",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 20.25,
    "royalty": 6.75,
    "fees": 0,
    "gross": 27.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0114",
    "invoiceId": "inv-255146",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 40.5,
    "royalty": 13.5,
    "fees": 0,
    "gross": 54.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0115",
    "invoiceId": "inv-511094",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 101.25,
    "royalty": 33.75,
    "fees": 0,
    "gross": 135.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0119",
    "invoiceId": "inv-702150",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 138.38,
    "royalty": 46.13,
    "fees": 0,
    "gross": 184.51,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0123",
    "invoiceId": "inv-872480",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 139.2,
    "royalty": 46.4,
    "fees": 0,
    "gross": 185.6,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0124",
    "invoiceId": "inv-462301",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0128",
    "invoiceId": "inv-848637",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 180.0,
    "royalty": 60.0,
    "fees": 0,
    "gross": 240.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0130",
    "invoiceId": "inv-782496",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 97.5,
    "royalty": 32.5,
    "fees": 0,
    "gross": 130.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0195",
    "invoiceId": "inv-201626",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-02",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0198",
    "invoiceId": "inv-612949",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-16",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0202",
    "invoiceId": "inv-136628",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-22",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0203",
    "invoiceId": "inv-780484",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-24",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0204",
    "invoiceId": "inv-688853",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-24",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0205",
    "invoiceId": "inv-850442",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-24",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0253",
    "invoiceId": "inv-648086",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-25",
    "billDate": "2026-09-25"
  },
  {
    "id": "BILL-0157",
    "invoiceId": "inv-554342",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 187.0,
    "royalty": 33.01,
    "fees": 0,
    "gross": 220.01,
    "status": "synced",
    "invoiceDate": "2026-09-09",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0158",
    "invoiceId": "inv-460629",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 391.0,
    "royalty": 69.0,
    "fees": 0,
    "gross": 460.0,
    "status": "synced",
    "invoiceDate": "2026-09-15",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0159",
    "invoiceId": "inv-181513",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 93.5,
    "royalty": 16.5,
    "fees": 0,
    "gross": 110.0,
    "status": "synced",
    "invoiceDate": "2026-09-23",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0237",
    "invoiceId": "inv-977079",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 267.1,
    "royalty": 47.14,
    "fees": 0,
    "gross": 314.24,
    "status": "synced",
    "invoiceDate": "2026-08-03",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0242",
    "invoiceId": "inv-720122",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 21.25,
    "royalty": 3.75,
    "fees": 0,
    "gross": 25.0,
    "status": "synced",
    "invoiceDate": "2026-09-10",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0243",
    "invoiceId": "inv-552133",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 178.5,
    "royalty": 31.5,
    "fees": 0,
    "gross": 210.0,
    "status": "synced",
    "invoiceDate": "2026-09-16",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0247",
    "invoiceId": "inv-494545",
    "franchiseId": "fr-06",
    "companyId": "co-06-1",
    "amount": 25.5,
    "royalty": 4.5,
    "fees": 0,
    "gross": 30.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0250",
    "invoiceId": "inv-201796",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0251",
    "invoiceId": "inv-588071",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-09-14",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0252",
    "invoiceId": "inv-974863",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "amount": 340.0,
    "royalty": 60.0,
    "fees": 0,
    "gross": 400.0,
    "status": "synced",
    "invoiceDate": "2026-09-14",
    "billDate": "2026-09-23"
  },
  {
    "id": "BILL-0265",
    "invoiceId": "inv-953905",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-22",
    "billDate": "2026-09-22"
  },
  {
    "id": "BILL-0266",
    "invoiceId": "inv-694608",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-22",
    "billDate": "2026-09-22"
  },
  {
    "id": "BILL-0201",
    "invoiceId": "inv-950363",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 163.2,
    "royalty": 28.8,
    "fees": 0,
    "gross": 192.0,
    "status": "synced",
    "invoiceDate": "2026-09-18",
    "billDate": "2026-09-18"
  },
  {
    "id": "BILL-0184",
    "invoiceId": "inv-967202",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-11",
    "billDate": "2026-09-17"
  },
  {
    "id": "BILL-0239",
    "invoiceId": "inv-248031",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-14",
    "billDate": "2026-09-17"
  },
  {
    "id": "BILL-0192",
    "invoiceId": "inv-297151",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-25",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0240",
    "invoiceId": "inv-772620",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 408.0,
    "royalty": 72.0,
    "fees": 0,
    "gross": 480.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0249",
    "invoiceId": "inv-921879",
    "franchiseId": "fr-08",
    "companyId": "co-08-1",
    "amount": 63.75,
    "royalty": 11.25,
    "fees": 0,
    "gross": 75.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0256",
    "invoiceId": "inv-114354",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-08",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0257",
    "invoiceId": "inv-653470",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-08",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0258",
    "invoiceId": "inv-615458",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-08",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0259",
    "invoiceId": "inv-352934",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0260",
    "invoiceId": "inv-973906",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0261",
    "invoiceId": "inv-644632",
    "franchiseId": "fr-09",
    "companyId": "co-09-2",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-11",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0262",
    "invoiceId": "inv-403258",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "amount": 165.0,
    "royalty": 55.0,
    "fees": 0,
    "gross": 220.0,
    "status": "synced",
    "invoiceDate": "2026-09-16",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0263",
    "invoiceId": "inv-324456",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-09-16",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0264",
    "invoiceId": "inv-886381",
    "franchiseId": "fr-09",
    "companyId": "co-09-3",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-16",
    "billDate": "2026-09-16"
  },
  {
    "id": "BILL-0197",
    "invoiceId": "inv-661979",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 335.75,
    "royalty": 59.25,
    "fees": 0,
    "gross": 395.0,
    "status": "synced",
    "invoiceDate": "2026-09-14",
    "billDate": "2026-09-15"
  },
  {
    "id": "BILL-0004",
    "invoiceId": "inv-780225",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 112.5,
    "royalty": 37.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0033",
    "invoiceId": "inv-361597",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 18.75,
    "royalty": 6.25,
    "fees": 0,
    "gross": 25.0,
    "status": "synced",
    "invoiceDate": "2026-07-10",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0047",
    "invoiceId": "inv-326372",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-23",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0061",
    "invoiceId": "inv-325123",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 120.0,
    "royalty": 40.0,
    "fees": 0,
    "gross": 160.0,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0063",
    "invoiceId": "inv-826230",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 40.5,
    "royalty": 13.5,
    "fees": 0,
    "gross": 54.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0077",
    "invoiceId": "inv-321756",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-15",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0101",
    "invoiceId": "inv-245647",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 120.0,
    "royalty": 40.0,
    "fees": 0,
    "gross": 160.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0106",
    "invoiceId": "inv-555907",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 338.63,
    "royalty": 112.88,
    "fees": 0,
    "gross": 451.51,
    "status": "synced",
    "invoiceDate": "2026-09-02",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0109",
    "invoiceId": "inv-517887",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 40.5,
    "royalty": 13.5,
    "fees": 0,
    "gross": 54.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0177",
    "invoiceId": "inv-414355",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 170.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-07-27",
    "billDate": "2026-09-11"
  },
  {
    "id": "BILL-0216",
    "invoiceId": "inv-817517",
    "franchiseId": "fr-04",
    "companyId": "co-04-3",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-17",
    "billDate": "2026-09-10"
  },
  {
    "id": "BILL-0220",
    "invoiceId": "inv-335629",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 22.95,
    "royalty": 4.05,
    "fees": 0,
    "gross": 27.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-10"
  },
  {
    "id": "BILL-0255",
    "invoiceId": "inv-154886",
    "franchiseId": "fr-09",
    "companyId": "co-09-1",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-09-08",
    "billDate": "2026-09-08"
  },
  {
    "id": "BILL-0241",
    "invoiceId": "inv-407304",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 59.5,
    "royalty": 10.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-09-04",
    "billDate": "2026-09-04"
  },
  {
    "id": "BILL-0191",
    "invoiceId": "inv-965545",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-25",
    "billDate": "2026-09-02"
  },
  {
    "id": "BILL-0194",
    "invoiceId": "inv-788366",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 136.0,
    "royalty": 24.0,
    "fees": 0,
    "gross": 160.0,
    "status": "synced",
    "invoiceDate": "2026-09-02",
    "billDate": "2026-09-02"
  },
  {
    "id": "BILL-0238",
    "invoiceId": "inv-358001",
    "franchiseId": "fr-05",
    "companyId": "co-05-1",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-14",
    "billDate": "2026-09-02"
  },
  {
    "id": "BILL-0153",
    "invoiceId": "inv-523647",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 59.5,
    "royalty": 10.5,
    "fees": 0,
    "gross": 70.0,
    "status": "synced",
    "invoiceDate": "2026-08-11",
    "billDate": "2026-09-01"
  },
  {
    "id": "BILL-0154",
    "invoiceId": "inv-840894",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 306.0,
    "royalty": 54.0,
    "fees": 0,
    "gross": 360.0,
    "status": "synced",
    "invoiceDate": "2026-08-12",
    "billDate": "2026-09-01"
  },
  {
    "id": "BILL-0003",
    "invoiceId": "inv-470279",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 112.5,
    "royalty": 37.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0008",
    "invoiceId": "inv-758948",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0010",
    "invoiceId": "inv-456689",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0012",
    "invoiceId": "inv-879047",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0013",
    "invoiceId": "inv-377195",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 82.5,
    "royalty": 27.5,
    "fees": 0,
    "gross": 110.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0018",
    "invoiceId": "inv-371656",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0020",
    "invoiceId": "inv-595750",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 30.0,
    "royalty": 10.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0029",
    "invoiceId": "inv-560494",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-08",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0032",
    "invoiceId": "inv-924926",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0041",
    "invoiceId": "inv-593444",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 48.75,
    "royalty": 16.25,
    "fees": 0,
    "gross": 65.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0045",
    "invoiceId": "inv-881350",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0048",
    "invoiceId": "inv-799935",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-07-24",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0052",
    "invoiceId": "inv-200979",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-07-24",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0066",
    "invoiceId": "inv-601701",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0068",
    "invoiceId": "inv-438245",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0069",
    "invoiceId": "inv-796202",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0070",
    "invoiceId": "inv-127889",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 193.5,
    "royalty": 64.5,
    "fees": 0,
    "gross": 258.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0071",
    "invoiceId": "inv-985403",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 168.75,
    "royalty": 56.25,
    "fees": 0,
    "gross": 225.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0072",
    "invoiceId": "inv-839075",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 131.25,
    "royalty": 43.75,
    "fees": 0,
    "gross": 175.0,
    "status": "synced",
    "invoiceDate": "2026-08-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0073",
    "invoiceId": "inv-742235",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 187.5,
    "royalty": 62.5,
    "fees": 0,
    "gross": 250.0,
    "status": "synced",
    "invoiceDate": "2026-08-11",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0074",
    "invoiceId": "inv-903720",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 26.25,
    "royalty": 8.75,
    "fees": 0,
    "gross": 35.0,
    "status": "synced",
    "invoiceDate": "2026-08-13",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0075",
    "invoiceId": "inv-653002",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 135.0,
    "royalty": 45.0,
    "fees": 0,
    "gross": 180.0,
    "status": "synced",
    "invoiceDate": "2026-08-14",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0079",
    "invoiceId": "inv-179797",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 105.0,
    "royalty": 35.0,
    "fees": 0,
    "gross": 140.0,
    "status": "synced",
    "invoiceDate": "2026-08-18",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0080",
    "invoiceId": "inv-584995",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 105.0,
    "royalty": 35.0,
    "fees": 0,
    "gross": 140.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0086",
    "invoiceId": "inv-258446",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0089",
    "invoiceId": "inv-711407",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 52.25,
    "royalty": 17.42,
    "fees": 0,
    "gross": 69.67,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0091",
    "invoiceId": "inv-980674",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0099",
    "invoiceId": "inv-502929",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-08-21",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0102",
    "invoiceId": "inv-582082",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 93.75,
    "royalty": 31.25,
    "fees": 0,
    "gross": 125.0,
    "status": "synced",
    "invoiceDate": "2026-08-26",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0104",
    "invoiceId": "inv-337977",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-08-28",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0176",
    "invoiceId": "inv-647586",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "amount": 170.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-07-10",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0180",
    "invoiceId": "inv-560097",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0185",
    "invoiceId": "inv-522918",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 153.0,
    "royalty": 27.0,
    "fees": 0,
    "gross": 180.0,
    "status": "synced",
    "invoiceDate": "2026-08-11",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0189",
    "invoiceId": "inv-453241",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-25",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0193",
    "invoiceId": "inv-668770",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 204.0,
    "royalty": 36.0,
    "fees": 0,
    "gross": 240.0,
    "status": "synced",
    "invoiceDate": "2026-08-31",
    "billDate": "2026-08-31"
  },
  {
    "id": "BILL-0058",
    "invoiceId": "inv-236875",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 5096.58,
    "royalty": 1698.86,
    "fees": 0,
    "gross": 6795.44,
    "status": "synced",
    "invoiceDate": "2026-08-03",
    "billDate": "2026-08-28"
  },
  {
    "id": "BILL-0215",
    "invoiceId": "inv-401009",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-08-17",
    "billDate": "2026-08-28"
  },
  {
    "id": "BILL-0217",
    "invoiceId": "inv-434716",
    "franchiseId": "fr-04",
    "companyId": "co-04-2",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-08-18",
    "billDate": "2026-08-28"
  },
  {
    "id": "BILL-0219",
    "invoiceId": "inv-337630",
    "franchiseId": "fr-04",
    "companyId": "co-04-1",
    "amount": 34.0,
    "royalty": 6.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-08-25",
    "billDate": "2026-08-28"
  },
  {
    "id": "BILL-0147",
    "invoiceId": "inv-715220",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-06-30",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0156",
    "invoiceId": "inv-149748",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 76.5,
    "royalty": 13.5,
    "fees": 0,
    "gross": 90.0,
    "status": "synced",
    "invoiceDate": "2026-08-23",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0172",
    "invoiceId": "inv-940171",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 42.5,
    "royalty": 7.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-06-30",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0178",
    "invoiceId": "inv-602102",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-28",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0179",
    "invoiceId": "inv-874900",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-07-28",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0181",
    "invoiceId": "inv-592870",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 331.5,
    "royalty": 58.5,
    "fees": 0,
    "gross": 390.0,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0182",
    "invoiceId": "inv-830106",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 223.13,
    "royalty": 39.38,
    "fees": 0,
    "gross": 262.51,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0183",
    "invoiceId": "inv-253306",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 223.13,
    "royalty": 39.38,
    "fees": 0,
    "gross": 262.51,
    "status": "synced",
    "invoiceDate": "2026-08-07",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0186",
    "invoiceId": "inv-767437",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 68.0,
    "royalty": 12.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-08-12",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0187",
    "invoiceId": "inv-173280",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-17",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0188",
    "invoiceId": "inv-376865",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-08-17",
    "billDate": "2026-08-27"
  },
  {
    "id": "BILL-0148",
    "invoiceId": "inv-743336",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 29.75,
    "royalty": 5.25,
    "fees": 0,
    "gross": 35.0,
    "status": "synced",
    "invoiceDate": "2026-07-06",
    "billDate": "2026-08-26"
  },
  {
    "id": "BILL-0152",
    "invoiceId": "inv-770978",
    "franchiseId": "fr-02",
    "companyId": "co-02-1",
    "amount": 44.62,
    "royalty": 7.87,
    "fees": 0,
    "gross": 52.49,
    "status": "synced",
    "invoiceDate": "2026-07-09",
    "billDate": "2026-08-26"
  },
  {
    "id": "BILL-0155",
    "invoiceId": "inv-574083",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 255.0,
    "royalty": 45.0,
    "fees": 0,
    "gross": 300.0,
    "status": "synced",
    "invoiceDate": "2026-08-20",
    "billDate": "2026-08-26"
  },
  {
    "id": "BILL-0001",
    "invoiceId": "inv-681704",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0002",
    "invoiceId": "inv-740550",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 112.5,
    "royalty": 37.5,
    "fees": 0,
    "gross": 150.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0005",
    "invoiceId": "inv-484456",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0006",
    "invoiceId": "inv-736427",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 90.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0007",
    "invoiceId": "inv-107714",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 45.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0009",
    "invoiceId": "inv-252562",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0011",
    "invoiceId": "inv-891834",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 37.5,
    "royalty": 12.5,
    "fees": 0,
    "gross": 50.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0014",
    "invoiceId": "inv-856798",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 30.0,
    "royalty": 10.0,
    "fees": 0,
    "gross": 40.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0015",
    "invoiceId": "inv-729743",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 60.0,
    "royalty": 20.0,
    "fees": 0,
    "gross": 80.0,
    "status": "synced",
    "invoiceDate": "2026-07-01",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0024",
    "invoiceId": "inv-849822",
    "franchiseId": "fr-01",
    "companyId": "co-01-5",
    "amount": 127.5,
    "royalty": 42.5,
    "fees": 0,
    "gross": 170.0,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0025",
    "invoiceId": "inv-414380",
    "franchiseId": "fr-01",
    "companyId": "co-01-6",
    "amount": 157.79,
    "royalty": 52.6,
    "fees": 0,
    "gross": 210.39,
    "status": "synced",
    "invoiceDate": "2026-07-02",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0027",
    "invoiceId": "inv-699288",
    "franchiseId": "fr-01",
    "companyId": "co-01-2",
    "amount": 210.0,
    "royalty": 70.0,
    "fees": 0,
    "gross": 280.0,
    "status": "synced",
    "invoiceDate": "2026-07-06",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0031",
    "invoiceId": "inv-167409",
    "franchiseId": "fr-01",
    "companyId": "co-01-1",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-07-09",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0036",
    "invoiceId": "inv-702337",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 21.98,
    "royalty": 7.33,
    "fees": 0,
    "gross": 29.31,
    "status": "synced",
    "invoiceDate": "2026-07-10",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0037",
    "invoiceId": "inv-981152",
    "franchiseId": "fr-01",
    "companyId": "co-01-7",
    "amount": 120.0,
    "royalty": 40.0,
    "fees": 0,
    "gross": 160.0,
    "status": "synced",
    "invoiceDate": "2026-07-14",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0039",
    "invoiceId": "inv-740858",
    "franchiseId": "fr-01",
    "companyId": "co-01-8",
    "amount": 75.0,
    "royalty": 25.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-07-17",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0050",
    "invoiceId": "inv-397204",
    "franchiseId": "fr-01",
    "companyId": "co-01-4",
    "amount": 150.0,
    "royalty": 50.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-07-24",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0055",
    "invoiceId": "inv-155814",
    "franchiseId": "fr-01",
    "companyId": "co-01-3",
    "amount": 120.0,
    "royalty": 40.0,
    "fees": 0,
    "gross": 160.0,
    "status": "synced",
    "invoiceDate": "2026-07-29",
    "billDate": "2026-08-14"
  },
  {
    "id": "BILL-0174",
    "invoiceId": "inv-519692",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 170.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-07-07",
    "billDate": "2026-07-10"
  },
  {
    "id": "BILL-0175",
    "invoiceId": "inv-664721",
    "franchiseId": "fr-03",
    "companyId": "co-03-1",
    "amount": 204.0,
    "royalty": 36.0,
    "fees": 0,
    "gross": 240.0,
    "status": "synced",
    "invoiceDate": "2026-07-08",
    "billDate": "2026-07-10"
  },
  {
    "id": "BILL-0173",
    "invoiceId": "inv-913205",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 85.0,
    "royalty": 15.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-07-07",
    "billDate": "2026-07-09"
  },
  {
    "id": "BILL-0145",
    "invoiceId": "inv-756354",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 374.0,
    "royalty": 66.0,
    "fees": 0,
    "gross": 440.0,
    "status": "synced",
    "invoiceDate": "2026-06-19",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0164",
    "invoiceId": "inv-718604",
    "franchiseId": "fr-03",
    "companyId": "co-03-2",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-06-18",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0165",
    "invoiceId": "inv-134359",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-06-18",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0166",
    "invoiceId": "inv-911111",
    "franchiseId": "fr-03",
    "companyId": "co-03-3",
    "amount": 170.0,
    "royalty": 30.0,
    "fees": 0,
    "gross": 200.0,
    "status": "synced",
    "invoiceDate": "2026-06-20",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0167",
    "invoiceId": "inv-472258",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 51.0,
    "royalty": 9.0,
    "fees": 0,
    "gross": 60.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0168",
    "invoiceId": "inv-661584",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0169",
    "invoiceId": "inv-588597",
    "franchiseId": "fr-03",
    "companyId": "co-03-5",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0170",
    "invoiceId": "inv-793401",
    "franchiseId": "fr-03",
    "companyId": "co-03-4",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0171",
    "invoiceId": "inv-809351",
    "franchiseId": "fr-03",
    "companyId": "co-03-6",
    "amount": 102.0,
    "royalty": 18.0,
    "fees": 0,
    "gross": 120.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-06-30"
  },
  {
    "id": "BILL-0146",
    "invoiceId": "inv-566885",
    "franchiseId": "fr-02",
    "companyId": "co-02-2",
    "amount": 0,
    "royalty": 100.0,
    "fees": 0,
    "gross": 100.0,
    "status": "synced",
    "invoiceDate": "2026-06-25",
    "billDate": "2026-06-25"
  }
];

export const reportFeeOverrides: FeeOverride[] = [
  {
    "id": "fo-1",
    "franchiseId": "fr-02",
    "territory": "Houston, TX",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-2",
    "franchiseId": "fr-03",
    "territory": "Phoenix, AZ",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-3",
    "franchiseId": "fr-04",
    "territory": "Atlanta, GA",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-4",
    "franchiseId": "fr-05",
    "territory": "Tampa, FL",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-5",
    "franchiseId": "fr-06",
    "territory": "Charlotte, NC",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-6",
    "franchiseId": "fr-07",
    "territory": "Nashville, TN",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-7",
    "franchiseId": "fr-08",
    "territory": "Denver, CO",
    "royaltyPct": 15,
    "feePct": 0
  },
  {
    "id": "fo-8",
    "franchiseId": "fr-10",
    "territory": "San Antonio, TX",
    "royaltyPct": 15,
    "feePct": 0
  }
];


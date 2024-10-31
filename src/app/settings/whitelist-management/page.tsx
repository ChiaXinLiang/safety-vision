"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";

export default function WhitelistManagementPage() {
  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Whitelist / Blacklist Management</h1>
        <Button variant="outline">Back to Settings</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Whitelist */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Whitelist</h2>
            <Button size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Search whitelist..." />
              <Button variant="outline">Search</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>WL001</TableCell>
                  <TableCell>Full Access</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Blacklist */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Blacklist</h2>
            <Button size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Search blacklist..." />
              <Button variant="outline">Search</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>BL001</TableCell>
                  <TableCell>Security Risk</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </main>
  );
}

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { certificates } from '@/lib/data';
import { Download, Medal, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CertificatesPage() {
  return (
    <div className="container mx-auto space-y-8">
      <div className="flex items-center gap-2">
            <Medal className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Your Certificates</h1>
              <p className="text-muted-foreground">Tangible proof of your competence.</p>
            </div>
          </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image
                src={cert.image}
                alt={cert.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint="certificate award"
                className="bg-muted"
              />
               <div className="absolute inset-0 bg-black/20" />
            </div>
            <CardHeader>
               <Badge variant="secondary" className="mb-2 w-fit">{cert.discipline}</Badge>
              <CardTitle>{cert.title}</CardTitle>
              <CardDescription>
                Issued on {cert.issueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex gap-2">
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

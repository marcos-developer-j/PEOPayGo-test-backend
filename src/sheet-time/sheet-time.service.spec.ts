import { Test, TestingModule } from '@nestjs/testing';
import { SheetTimeService } from './sheet-time.service';

describe('SheetTimeService', () => {
  let service: SheetTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetTimeService],
    }).compile();

    service = module.get<SheetTimeService>(SheetTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
